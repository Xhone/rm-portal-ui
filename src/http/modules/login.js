import axios from '../axios.js'
/**
 * 登录模块
 */
//登录
export const login=data=>{
    return axios({
        url:'/login',
        method:'post',
        data
    })
}

export const logout=()=>{
    return axios({
        url:'logout',
        method:'get'
    })
}