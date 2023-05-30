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
    if (to.matched.length == 0) return next({ path: '/404' });

    next({ path: '/login' })
})
export default router