<template>
    <div style="position: absolute;">
        <el-form :inline="true" :model="mpoForm" class="demo-form-inline">
        <el-form-item label="Mpo No">
            <el-input/>
        </el-form-item>
        <el-form-item label="Mpo Date">
            <el-date-picker placeholder="Mpo Date"/>
        </el-form-item>
        <el-form-item label="Attn">
            <el-input/>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { reactive } from 'vue';

export default (await import('vue')).defineComponent({
    name:'EditMpo',
    setup(){
        const mpoForm=reactive({

        });
        return{
            mpoForm
        }
    }
})
</script>