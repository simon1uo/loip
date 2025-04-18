import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import './style.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const app = createApp(App)

// Use plugins
app.use(i18n)

// Mount app
app.mount('#app')
