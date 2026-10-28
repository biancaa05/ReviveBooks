import { createI18n } from 'vue-i18n'
import ro from './locales/ro.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'ro',
  fallbackLocale: 'en',
  messages: {
    ro,
    en,
  },
})

export default i18n

