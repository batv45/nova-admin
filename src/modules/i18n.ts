import type { App } from 'vue'
import { local } from '@/utils/storage'
import { createI18n } from 'vue-i18n'
import enUS from '../../locales/en.json'
import trTR from '../../locales/tr.json'

const { VITE_DEFAULT_LANG } = import.meta.env

export const i18n = createI18n({
  legacy: false,
  locale: local.get('lang') || VITE_DEFAULT_LANG, // Display language by default
  fallbackLocale: VITE_DEFAULT_LANG,
  messages: {
    trTR,
    enUS,
  },
  // Lack of international keys warning
  // missingWarn: false,

  // Lack of refusal content warning
  fallbackWarn: false,
})

export function install(app: App) {
  app.use(i18n)
}
