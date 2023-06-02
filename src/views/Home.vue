<template>
    <div class="container">
        <el-container>

            <el-aside width="180px">
                <nav-bar></nav-bar>
            </el-aside>
            <el-container>
                <el_header>
                    <head-bar></head-bar>
                </el_header>
                <el-main>
                    <main-content></main-content>
                </el-main>
            </el-container>

        </el-container>
        <!-- <h2>Home Page</h2>
        <el-button type="primary" @click="testAxios()">test</el-button>
        <el-button type="primary" @click="getUser()">getuser</el-button>
        <el-button type="primary" @click="getMenu()">getMenu</el-button> -->
        <!--导航菜单栏-->
        <!-- <NavBar/> -->
        <!--头部区域-->
        <!-- <HeadBar/> -->
        <!--主内容区域-->
        <!-- <MainContent/> -->
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
            axios.get('http://localhost:8080')
                .then(function (res) {
                    alert(res.data);
                }).catch(function (res) {
                    alert(res);
                })

        },
        getUser() {
            axios.get('http://localhost:8080/user')
                .then(function (res) {
                    alert(res.data);
                }).catch(function (res) {
                    alert('error: ' + res);
                })
        },
        getMenu() {
            axios.get('http://localhost:8080/menu')
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