<template>
  <div class="page">
    <h2>Home Page</h2>
    <el-button type="primary" @click="testAxios()">test</el-button>
    <el-button type="primary" @click="getUser()">getuser</el-button>
    <el-button type="primary" @click="getMenu()">getMenu</el-button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'Home',
    methods:{
        testAxios(){
            axios.get('http://localhost:8080')
            .then(function(res){
                alert(res.data);
            }).catch(function(res){
                alert(res);
            })
          
        },
        getUser(){
            axios.get('http://localhost:8080/user')
            .then(function(res){
                alert(res.data);
            }).catch(function(res){
                alert(res);
            })
        },
        getMenu(){
            axios.get('http://localhost:8080/menu')
            .then(function(res){
                alert(res.data);
            }).catch(function(res){
                alert(res);
            })
        }

    }
}
</script>

<style>

</style>