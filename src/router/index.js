import { createRouter, createWebHashHistory } from 'vue-router'
import api from '@/http/api'
import store from '../store';
import viewgird from './viewGird'
import redirect from './redirect';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        children: [
            ...viewgird,
            ...redirect,
        
          
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
   
   
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
//导航守卫
router.beforeEach((to, from, next) => {
    //登录界面登录成功之后，用户信息保持在会话
    //存在时间为会话生命周期，页面关闭即失效
    let user = sessionStorage.getItem('user');
    if (to.path == '/login') {
        //如果访问登录界面和存在用户会话信息，直接跳转到主页
        if (user) {
            next({ path: '/' })
        } else {
            next()
        }
    } else {//非登录界面，而且不存在会话信息，跳转到登录界面
        if (!user) {
            next({ path: '/login' })
        } else {
            //加载动态菜单和路由
            //addDynamicMenuAndRoutes(user, to, from);
            next()
        }
    }
})
/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(user, to, from) {
    //动态菜单和路由是否存在
    if (store.state.app.menuRouteLoaded) {
        return
    }
    api.menu.findNavTree({'userName':user})
    .then(res=>{
        let dynamicRoutes=addDynamicRoutes(res.data);
        router.addRoute(router.options.routes);
        //保存加载状态
        store.commit('menuRouteLoaded',true);
        //保存菜单树
        store.commit('setNavTree',res.data);
    }).then(res=>{
        api.user.findPermissions({'name':user}).then(res=>{
            store.commit('setPerms',res.data);
        })
    }).catch(function(res){

    });

}

function addDynamicRoutes(menuList=[],routes=[]){

}
export default router