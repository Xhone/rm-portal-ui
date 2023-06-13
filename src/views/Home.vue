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
        }

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