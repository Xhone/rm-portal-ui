<template>
    <div class="container">

        <!-- 导航菜单栏-->
        <nav-bar></nav-bar>
        <!--头部区域-->
        <head-bar></head-bar>
        <!--主内容区域-->
        <main-content></main-content>

    </div>
</template>

<script>
import axios from 'axios';
import http from '@/http/api';
import store from '@/store/index'
import HeadBar from '../views/HeadBar/HeadBar.vue'
import NavBar from '../views/NavBar/NavBar.vue'
import MainContent from '@/views/MainContent/MainContent.vue'

export default {
    name: 'Home',
    components: {
        HeadBar,
        NavBar,
        MainContent
    },
    methods: {
        testAxios() {
            axios.get('https://localhost:44311')
                .then(function (res) {
                    alert(res.data);
                }).catch(function (res) {
                    alert(res);
                })

        },
        getUser() {
            axios.get('https://localhost:44311/api/user')
                .then(function (res) {
                    alert(res.data);
                }).catch(function (res) {
                    alert('error: ' + res);
                })
        },
        getMenu() {
            axios.get('https://localhost:44311/api/menu')
                .then(function (res) {
                    alert(res.data);
                }).catch(function (res) {
                    alert(res);
                })
        },
        initSGSDate(){
            http.dtrade.getSupplier().then((res) => {
                store.commit("clearSupplier")
                store.commit("setSupplier",res.data);
                sessionStorage.setItem("supplier",JSON.stringify(store.state.suppliers));

            }).catch((error) => {

            });
        },

    },
    mounted(){
        this.initSGSDate();
    }
}
</script>

<style lang="less" scoped>
.container {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>