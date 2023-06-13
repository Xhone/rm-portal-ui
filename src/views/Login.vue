<template>
    <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="auto"
        class="demo-ruleForm login-container">
        <img alt="rmportal logo" src="../assets/logo.gif">
        <h2 class="title" style="padding-left:22px;">Sign in to RMPortal</h2>

        <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:48%;" @click="reset">Reset</el-button>
            <el-button type="primary" style="width:48%;" @click="login" :loading="loading">Sign in</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { reactive } from 'vue';
//import mock from '@/mock/index'
import Cookies from "js-cookie"
import http from '@/http/api'
//import http from '@/http/http.js';
import store from '../store/index'
import router from "@/router";
import { alertProps } from "element-plus";
export default {
    name: 'Login',
    data() {
        return {
            logining: false,
           
            loginForm: {
                username: 'admin',
                password: '123456'
            },
            fieldRules: {
                username: {
                    required: true,
                    message: 'please enter your account',
                    trigger: 'blur'
                },
                password: {
                    required: true,
                    message: 'please enter your password',
                    trigger: 'blur'
                }
            },
            checked: true
        }
    },
    setup(){
       
    },
    methods: {
        login() {
            this.loading = true
            let loginInfo = {
                username: this.loginForm.username,
                password: this.loginForm.password
            }
           
            //JSON.stringify(loginInfo)
            http.login.login(loginInfo).then((res) => {
                if (res.message != null) {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                } else {

                    //Cookies.set('token', res.data.token)//放置token到Cookie
                    sessionStorage.setItem('user', loginInfo.username)
                    store.commit('menuRouteLoaded',false)//要求重新加载导航菜单
                    router.push('/')
                }

                this.loading = false
            }).catch(function (res) {
                alert("Username or password is incorrect");
            })
        },
        reset() {
            this.$refs.loginForm.resetFields();
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 100px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }
}
</style>