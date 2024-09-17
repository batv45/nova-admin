import type { App } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './app/index'
export * from './auth'
export * from './dict'
export * from './router'
export * from './tab'

// Install PINIA Global Status Library
export function installPinia(app: App) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
