<template>
    <el-sub-menu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
        <template #title>
            <!-- <i :class="menu.icon"></i> -->
            <span>{{ menu.name }}</span>
        </template>
        <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
    </el-sub-menu>
    <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
        <template #title>
            <!-- <i :class="menu.icon"></i> -->
            <span>{{ menu.name }}</span>
        </template>
    </el-menu-item>
</template>
<script>
import { getIFramePath } from '@/util/iframe'
export default (await import('vue')).defineComponent({
    name: 'MenuTree',
    props: {
        menu: { 
            type: Object, 
            required: true, 
        }
    },
    methods:{
        handleRoute(menu){
            let path=getIFramePath(menu.url)
            if(!path){
                path=menu.url;
            }
            this.$router.push("/"+path);
        }
    }
})
</script>