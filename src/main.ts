import '@/styles/main.scss'
import "element-plus/theme-chalk/src/message.scss"; // elmessage样式
import 'element-plus/theme-chalk/src/message-box.scss' // elmessage-box样式
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化插件
import App from './App.vue'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 全局注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(router).mount('#app')