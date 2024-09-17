import type { RouteLocationNormalized } from 'vue-router'
import { router } from '@/router'

interface TabState {
  pinTabs: RouteLocationNormalized[]
  tabs: RouteLocationNormalized[]
  currentTabPath: string
}
export const useTabStore = defineStore('tab-store', {
  state: (): TabState => {
    return {
      pinTabs: [],
      tabs: [],
      currentTabPath: '',
    }
  },
  getters: {
    allTabs: state => [...state.pinTabs, ...state.tabs],
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      // Determine whether it is not added according to META, it can be used for error page, login page, etc.
      if (route.meta.withoutTab)
        return

      // If the tag name already exists, it will not be added
      if (this.hasExistTab(route.path as string))
        return

      // Pass to different groups according to meta.pintab
      if (route.meta.pinTab)
        this.pinTabs.push(route)
      else
        this.tabs.push(route)
    },
    async closeTab(path: string) {
      const tabsLength = this.tabs.length
      // If the dynamic label is greater than one, the label will jump
      if (this.tabs.length > 1) {
        // Get the closure label index
        const index = this.getTabIndex(path)
        const isLast = index + 1 === tabsLength
        // If it is the current page that is closed, the routing jump to the latter label of the original label
        if (this.currentTabPath === path && !isLast) {
          // Jump to the latter label
          router.push(this.tabs[index + 1].path)
        }
        else if (this.currentTabPath === path && isLast) {
          // It's the last one, just jump the first one
          router.push(this.tabs[index - 1].path)
        }
      }
      // Delete label
      this.tabs = this.tabs.filter((item) => {
        return item.path !== path
      })
      // If it is cleared after deleting, jump to the default homepage
      if (tabsLength - 1 === 0)
        router.push('/')
    },

    closeOtherTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i === index)
    },
    closeLeftTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i >= index)
    },
    closeRightTabs(path: string) {
      const index = this.getTabIndex(path)
      this.tabs = this.tabs.filter((item, i) => i <= index)
    },
    clearAllTabs() {
      this.tabs.length = 0
      this.pinTabs.length = 0
    },
    closeAllTabs() {
      this.tabs.length = 0
      router.push('/')
    },

    hasExistTab(path: string) {
      const _tabs = [...this.tabs, ...this.pinTabs]
      return _tabs.some((item) => {
        return item.path === path
      })
    },
    /* Set the currently activated label */
    setCurrentTab(path: string) {
      this.currentTabPath = path
    },
    getTabIndex(path: string) {
      return this.tabs.findIndex((item) => {
        return item.path === path
      })
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
