import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'
import { createPinia } from 'pinia'
import XtxUI from './components'

const app = createApp(App)

app.use(XtxUI)
app.use(router)
app.use(createPinia())
app.mount('#app')
