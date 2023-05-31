import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/404',
        name: 'notFound',
        component: () => { return import('@/views/404.vue') }
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

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
    }else{//非登录界面，而且不存在会话信息，跳转到登录界面
            if(!user){
                next({path:'/login'})
            }else{
                next()
            }
    }
})

export default router