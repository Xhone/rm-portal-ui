let viewgird=[
    // {
    //     path:'/user',
    //     name:'user',
    //     component:()=>import('@/views/sys/User.vue')
    // },
    {
        path:'/menu',
        name:'menu',
        component:()=>import('@/views/sys/Menu.vue')
    },
    {
        path:'/GenMPO',
        name:'GenMPO',
        component:()=>import('@/views/PurchaseOrder/GenMPO.vue')
    },
    {
        path:'/EditMpo',
        name:'EditMpo',
        component:()=>import('@/views/PurchaseOrder/EditMpo.vue')
    }
]

export default viewgird