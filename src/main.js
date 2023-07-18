import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './http'
import store from './store'
import global from './util/global'
import base from './util/common'
//import axios from 'axios'

import watermark from './util/watermark.js'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/element-icon/icon.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import config from './http/config'
const debounce=(fn,delay)=>{
    let timer=null;
    return function(){
        let context=this;
        let args=arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
            fn.apply(context,args);
        },delay);
    }
}
//解决引用el-menu-item报ResizeObserver的错误.
const _ResizeObserver=window.ResizeObserver;
window.ResizeObserver=class ResizeObserver extends _ResizeObserver{
    constructor(callback){
        callback=debounce(callback,16);
        super(callback);
    }
}
const app=createApp(App)
//引入Element Plus icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.base=base;
app.config.globalProperties.global=global;
app.config.globalProperties.$tabs={};
app.config.globalProperties.$api=api
app.config.globalProperties.$watermark=watermark
app.config.globalProperties.$base=base
app.use(store)
app.use(router)
app.use(ElementUI)
app.mount('#app')
app.config.globalProperties.$Message=app.config.globalProperties.$message;