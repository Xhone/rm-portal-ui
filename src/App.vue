<template>
  <img alt="Vue logo" src="./assets/logo-M.gif">
  <div
  class="static"
  :class="classObject"></div>
  
  <div>
    <form>
      <div>
        <label>username:</label>
      <input type="text" />
      </div>
      <div>
        <label>password:</label>
      <input type="password" />
      </div>
    
      <ul>
     <li v-for="q in quote" :key="q">{{ q }}</li>
    </ul>
    </form>
   
  </div>
  <HelloWorld  msg="Wellcome to OMPortal"/>
 
</template>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import {ref,reactive} from 'vue'
const quote=ref('')

const classObject=reactive({
  active:true,
  'text-danger':false
})
axios.get('https://localhost:44387/api/Student/1').then(reponse=>{
      quote.value=reponse.data
    }).catch(error=>{
      console.log('error is '+error)
    })   
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
