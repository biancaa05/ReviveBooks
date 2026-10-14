import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { ui } from './ui'

import './style.css'

const app = createApp(App)

app.config.globalProperties.$ui = ui
app.use(router)
app.mount('#app')
