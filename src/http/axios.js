import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'

export default function $axios(options){
    return new Promise((resolve,reject)=>{
        const instance=axios.create({
            baseURL:config.baseUrl,
            headers:config.headers,
            timeout:config.timeout,
            withCredentials:config.withCredentials
        })
        //request拦截器
        instance.interceptors.request.use(
            config=>{
                let token=Cookies.get('token')
                if(token){
                    config.headers.token=token
                }else{
                    router.push('/login')
                }
                return config
            },
            error=>{
                console.log('request: ',error)
                //判断请求超时
                if(error.code==='ECONNABORTED'&&error.message.indexof('timeout'!==-1)){
                    console.log('timeout request')
                }
                //重定向到错误页面
                const errorInfo=error.response
                console.log(errorInfo)
                if(errorInfo){
                    error=errorInfo.data
                    const errorStatus=errorInfo.status;
                    router.push({
                        path:'/404'
                    })
                }
                return Promise.reject(error)
            }
        )
    })
}