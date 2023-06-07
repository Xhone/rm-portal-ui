<template>
<div class="menu-bar-container">
<div class="logo" style="background:#14889A;" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" 
@click="$router.push('/')">
    <img v-show="collapse" src="@/assets/logo.gif"/>
    <div>{{ collapse?'':appName }}</div>
</div>
<!--导航菜单-->
<el-menu default-active="1" class="el-menu-vertical-demo" :class="menu-bar-width">
<el-submenu index="1" class="el-icon-system">
    <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">系统</span>
    </template>
    <el-menu-item index="1-1" class="el-icon-user">用户管理</el-menu-item>
    <el-menu-item index="1-2" class="el-icon-menu" @click="$router.push('menu')">菜单管理</el-menu-item>
</el-submenu>
</el-menu>
</div>
</template>
<script>
import {ref} from 'vue'
import { mapState } from 'vuex';
import state from '@/store'
export default(await import('vue')).defineComponent({
    name:"NavBar",
    setup(){
          
    },
    computed:{
        ...mapState({
            appName:state=>state.app.appName,
            collapse:state=>state.app.collapse,
        })
    }
})
</script>
<style lang="less" scoped>
.menu-bar-container{
    position: fixed;
    top:0px;
    left:0px;
    bottom:0px;
    z-index: 1020;
    .el-menu{
        position: absolute;
        top:60px;
        bottom: 0px;
        text-align: left;
    }
    .logo{
        position: absolute;
        top: 0px;
        height: 60px;
        line-height: 60px;
        background: #545c64;
        cursor:pointer;
        img{
            width:40px;
            height: 40px;
            border-radius: 0px;
            margin: 10px 10px 10px 10px;
            float: left;
        }
        div{
            font-size: 25px;
            color: white;
            text-align: left;
            padding-left: 20px;
        }
    }
    .menu-bar-width{
        width: 200px;
    }
    .menu-bar-collapse-width{
        width: 65px;
    }
}
</style>