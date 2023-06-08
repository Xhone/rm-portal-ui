<template>
<h2 :class="test">{{ mpo }}</h2>

</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name:'GenMPO',
    data(){
        return{
            mpo:"测试测试测试测试测试测试",
        }
    },
    methods:{
        test(){
            alert(this.mpo);
        }
    },
    mounted(){
        test()
    },
})
</script>
<style scoped>
</style>