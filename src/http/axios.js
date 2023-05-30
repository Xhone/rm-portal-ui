import axios from 'axios'
import config from './config'
import Cookies from 'js-cookie'
import router from '@/router'

export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })
        //request拦截器
        instance.interceptors.request.use(
            config => {
                let token = Cookies.get('token')
                if (token) {
                    config.headers.token = token
                } else {
                    router.push('/login')
                }
                return config
            },
            error => {
                console.log('request: ', error)
                //判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexof('timeout' !== -1)) {
                    console.log('timeout request')
                }
                //重定向到错误页面
                const errorInfo = error.response
                console.log(errorInfo)
                if (errorInfo) {
                    error = errorInfo.data
                    const errorStatus = errorInfo.status;
                    router.push({
                        path: '/404'
                    })
                }
                return Promise.reject(error)

            }
        )

        //response 拦截器
        instance.interceptors.response.use(response => {
            let data;
            if (response.data == undefined) {
                data = JSON.parse(response.request.responseText)
            } else {
                data = response.data
            }

            switch (data.rc) {
                case 1:
                    console.log(data.desc)
                    break;
                default:
                    break;
            }
            return Promise.resolve(response)
        },
        error=>{
            let httpMessage=''
            if(error&&error.response){
                if(error.response.status=='404'){
                    httpMessage='未找到请求地址'
                }
            }else{
                httpMessage='服务器处理异常'
            }
            return Promise.reject(error)
        })
        //请求处理
        instance(options).then(res=>{
            resolve(res)
            return false
        }).catch(error=>{
            reject(error)
        })
    })
}