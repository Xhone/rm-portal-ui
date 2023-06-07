<template>
<h2>{{ menuName }}</h2>
</template>
<script>
import { defineComponent,ref } from 'vue';
export default defineComponent({
    name:'Menu',
    setup(){
        const menuName=ref('菜单页面');
        return{
            menuName,
        };
    },
})
</script>