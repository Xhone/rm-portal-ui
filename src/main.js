import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './http'
import store from './store'
import base from './util/global'
//import axios from 'axios'

import watermark from './util/watermark.js'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
const app=createApp(App)
app.config.globalProperties.$api=api
app.config.globalProperties.$watermark=watermark
app.config.globalProperties.$base=base
app.use(store)
app.use(router)
app.use(ElementUI)

app.mount('#app')
