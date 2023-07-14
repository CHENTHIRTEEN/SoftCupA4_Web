import { createApp } from 'vue'
import App from './App.vue'
// import dataV from '@jiaminghi/data-view'
import router from './router'
import './assets/css/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import http from './api'
// import 'normalize.css'
import 'dayjs'


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import echarts from "./echarts/echarts.js";
app.provide('echarts', echarts)
// app.use(dataV)
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$http = http;
app.mount('#app');
