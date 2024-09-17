import { router } from '@/router'
import { fetchLogin } from '@/service'
import { local } from '@/utils'
import { useRouteStore } from './router'
import { useTabStore } from './tab'

interface AuthStatus {
  userInfo: Api.Login.Info | null
  token: string
}
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthStatus => {
    return {
      userInfo: local.get('userInfo'),
      token: local.get('accessToken') || '',
    }
  },
  getters: {
    /** Whether to log in */
    isLogin(state) {
      return Boolean(state.token)
    },
  },
  actions: {
    /* Log in to exit, reset user information, etc. */
    async logout() {
      const route = unref(router.currentRoute)
      // Clear local cache
      this.clearAuthStorage()
      // Data such as clearing routes, menu and other data
      const routeStore = useRouteStore()
      routeStore.resetRouteStore()
      // Clear the label bar data
      const tabStore = useTabStore()
      tabStore.clearAllTabs()
      // Reset the current repository
      this.$reset()
      // Reset to the login page
      if (route.meta.requiresAuth) {
        router.push({
          name: 'login',
          query: {
            redirect: route.fullPath,
          },
        })
      }
    },
    clearAuthStorage() {
      local.remove('accessToken')
      local.remove('refreshToken')
      local.remove('userInfo')
    },

    /* User login */
    async login(userName: string, password: string) {
      try {
        const { isSuccess, data } = await fetchLogin({ userName, password })
        if (!isSuccess)
          return

        // Process login information
        await this.handleLoginInfo(data)
      }
      catch (e) {
        console.warn('[Login Error]:', e)
      }
    },

    /* Process data returned by login */
    async handleLoginInfo(data: Api.Login.Info) {
      // Save the Token and UserInfo
      local.set('userInfo', data)
      local.set('accessToken', data.accessToken)
      local.set('refreshToken', data.refreshToken)
      this.token = data.accessToken
      this.userInfo = data

      // Add route and menu
      const routeStore = useRouteStore()
      await routeStore.initAuthRoute()

      // Rotate the redirection
      const route = unref(router.currentRoute)
      const query = route.query as { redirect: string }
      router.push({
        path: query.redirect || '/',
      })
    },
  },
})
