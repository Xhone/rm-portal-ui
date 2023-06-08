<template>
    <div class="menu-bar-container">
        <div class="logo" style="background:#14889A;" :class="collapse ? 'menu-bar-collapse-width' : 'menu-bar-width'"
            @click="$router.push('/')">
            <img v-show="collapse" src="@/assets/logo.gif" />
            <div>{{ collapse ? '' : appName }}</div>
        </div>
        <!--导航菜单-->
        <el-menu default-active="1" class="el-menu-vertical-demo" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'"
        :collapse="collapse" @open="handleOpen" @close="handleClose">
            <el-submenu index="1" class="el-icon-system">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">Purchase Order</span>
                </template>
                <el-menu-item index="1-1" class="el-icon-edit" @click="this.$router.push({name:'GenMPO'})">Gen MPO</el-menu-item>
              
            </el-submenu>
            <el-submenu index="2" class="el-icon-system">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">系统</span>
                </template>
                <el-menu-item index="2-1" class="el-icon-user">用户管理</el-menu-item>
                <el-menu-item index="2-2" class="el-icon-menu" @click="$router.push('menu')">菜单管理</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>

import { mapState } from 'vuex';
import store from '@/store';
export default (await import('vue')).defineComponent({
    name: "NavBar",
    setup() {
        const handleOpen=(key,keyPath)=>{
            console.log(key,keyPath);
        }
        const handleClose=(key,keyPath)=>{
            console.log(key,keyPath);
        }
        // const handleRoute=(route)=>{
        //     //tab标签页被选中，如果不存在就添加
        //     var tab=this.mainTabs.filter(item=>item.name===route.name)[0];
        //     if(!tab){
        //         tab={
        //             name:route.name,
        //             title:route.name,
        //             icon:route.meta.icon
        //         }
        //         this.mainTabs=this.mainTabs.concat(tab)
        //     }
        //     this.mainTabsActiveName=tab.name;
        //     //切换标签页时同步更新高亮菜单
            
        // }
        // const created=()=>{
        //     handleRoute(this.$router);
        // }
        // created();
        return{
            handleOpen,
            handleClose,
            //handleRoute,
        }
    },
    computed: {
        ...mapState({
            appName: state => state.app.appName,
            collapse: state => state.app.collapse,
        }),
        mainTabs:{
            get(){return store.state.tab.mainTabs},
            set(val){store.commit('updateMainTabs',val)}
        },
        mainTabsActiveName:{
            get(){return store.state.tab.mainTabsActiveName},
            set(val){store.commit('updateMainTabsActiveName',val)}
        }
    },
    watch:{
        //$router:"handleRoute"
    },
   
})
</script>
<style lang="less" scoped>
.menu-bar-container {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    z-index: 1020;

    .el-menu {
        position: absolute;
        top: 60px;
        bottom: 0px;
        text-align: left;
    }

    .logo {
        position: absolute;
        top: 0px;
        height: 60px;
        line-height: 60px;
        background: #545c64;
        cursor: pointer;

        img {
            width: 40px;
            height: 40px;
            border-radius: 0px;
            margin: 10px 10px 10px 10px;
            float: left;
        }

        div {
            font-size: 25px;
            color: white;
            text-align: left;
            padding-left: 20px;
        }
    }

    .menu-bar-width {
        width: 200px;
    }

    .menu-bar-collapse-width {
        width: 65px;
    }
}</style>