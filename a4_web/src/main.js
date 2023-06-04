import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ArcoVue from '@arco-design/web-vue'
// import '@arco-design/web-vue/dist/arco.css'
import http from './api'


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$http = http;
app.mount('#app');
