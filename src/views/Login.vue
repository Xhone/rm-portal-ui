<template>
   <el-form>

   </el-form>>
</template>

<script>
import { dataType } from "element-plus/es/components/table-v2/src/common";
import Cookies from"js-cookie"
export default {
    name:'Login',
    data(){
        return{
            logining:false,
            loginForm:{
                account:'admin',
                password:'123456'
            },
            fieldRules:{
                account:{
                    required:true,
                    message:'please enter your account',
                    trigger:'blur'
                },
                password:{
                    required:true,
                    message:'please enter your password',
                    trigger:'blur'
                }
            },
            checked:true
        }
    },
    methods:{
        login(){
            
        }
    }
}
</script>