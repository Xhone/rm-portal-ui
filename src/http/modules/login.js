import axios from '../axios.js'
/**
 * 登录模块
 */
//登录
export const login=(data)=>{
    return axios({
        url:'api/User/login',
        method:'post',
        data:data,
        
    })
}

export const login2=(params)=>{
    return axios({
        url:'api/User/login2',
        method:'post',
        params:params
    })
}
export const logout=()=>{
    return axios({
        url:'logout',
        method:'get'
    })
}