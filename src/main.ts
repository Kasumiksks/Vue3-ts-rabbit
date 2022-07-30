import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router'
import { createPinia } from 'pinia'
import XtxUI from './components'
import directives from './directives'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 数据持久化存储插件

createPinia().use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(directives)
app.use(XtxUI)
app.use(router)
app.use(createPinia())
app.mount('#app')
