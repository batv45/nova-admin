import type { App } from 'vue'
import { installRouter } from '@/router'
import { installPinia } from '@/store'
import AppVue from './App.vue'
import AppLoading from './components/common/AppLoading.vue'

async function setupApp() {
  // Load the global loading loading status
  const appLoading = createApp(AppLoading)
  appLoading.mount('#appLoading')

  // Create a Vue instance
  const app = createApp(AppVue)

  // Register module Pinia
  await installPinia(app)

  // Registered module Vue-router
  await installRouter(app)

  /* Registration module instruction/static resource */
  Object.values(
    import.meta.glob<{ install: (app: App) => void }>('./modules/*.ts', {
      eager: true,
    }),
  ).map(i => app.use(i))

  // Uninstalled animation
  appLoading.unmount()

  // Mount
  app.mount('#app')
}

setupApp()
