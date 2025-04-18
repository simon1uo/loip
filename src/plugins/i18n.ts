import { createI18n } from 'vue-i18n'
import messages from '../locales'

// Create i18n instance
export const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language
  messages, // Locale messages
})

// Export i18n instance
export default i18n
