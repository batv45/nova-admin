import type { Router } from 'vue-router'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import { local } from '@/utils'

const title = import.meta.env.VITE_APP_NAME

export function setupRouterGuard(router: Router) {
  const appStore = useAppStore()
  const routeStore = useRouteStore()
  const tabStore = useTabStore()

  router.beforeEach(async (to, from, next) => {
    // Determine whether it is an external link, if it is directly opened the webpage and intercept the jump
    if (to.meta.href) {
      window.open(to.meta.href)
      return false
    }
    // Start loadingbar
    appStore.showProgress && window.$loadingBar?.start()

    // Determine whether there is token, log in to the verification
    const isLogin = Boolean(local.get('accessToken'))
    if (!isLogin) {
      if (to.name === 'login')
        next()

      if (to.name !== 'login') {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    // Determine whether the route is initialized
    if (!routeStore.isInitAuthRoute) {
      await routeStore.initAuthRoute()
      // Dynamic routing loaded back to the root routing
      if (to.name === '404') {
      // Waiting for the right routing, return to the previous route, otherwise 404
        next({
          path: to.fullPath,
          replace: true,
          query: to.query,
          hash: to.hash,
        })
        return false
      }
    }

    // Determine whether the current page is on Login, then position it to the homepage
    if (to.name === 'login') {
      next({ path: '/' })
      return false
    }

    next()
  })
  router.beforeResolve((to) => {
    // Set the menu highlight
    routeStore.setActiveMenu(to.meta.activeMenu ?? to.fullPath)
    if (appStore.showTabs) {
      // Add tabs
      tabStore.addTab(to)
    }
    // Set the highlight label;
    tabStore.setCurrentTab(to.path as string)
  })

  router.afterEach((to) => {
    // Modify webpage titles
    document.title = `${to.meta.title} - ${title}`
    // End loadingbar
    appStore.showProgress && window.$loadingBar?.finish()
  })
}
