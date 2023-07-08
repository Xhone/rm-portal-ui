<template>
  <div id="app">
   
    <el-config-provider :locale="locale">
      <router-view v-if="isRouterAlive" />
    </el-config-provider>

  </div>
</template>
<script>
import {getCurrentInstance, provide, ref} from 'vue'
import { ElConfigProvider } from "element-plus";
//import zhCn from "element-plus/lib/locale/lang/zh-cn";
export default {
  name: 'rm-portal',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,//添加组件
  },
  setup(props,context){
    const {proxy}=getCurrentInstance();
    const isRouterAlive=ref(true);
    const reload=()=>{
      isRouterAlive.value=false;
      proxy.$nextTick(()=>{
        isRouterAlive.value=true;
      })
    }
    provide('reload',reload);
    return{
      isRouterAlive,
      reload
    }
  },
  data() {
    return {
      //locale: zhCn
    }
  }
}
// import axios from 'axios'
// import {ref,reactive} from 'vue'
//import watermark from './util/watermark'



//watermark.set("Not Approved")
// axios.get('https://localhost:44387/api/Student/1').then(reponse=>{
//       quote.value=reponse.data
//     }).catch(error=>{
//       console.log('error is '+error)
//     })   
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #484a4d;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

}
</style>
