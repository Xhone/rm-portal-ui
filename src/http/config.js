import { baseUrl } from '@/util/global'
export default {
    method: 'get',
    // 基础url前缀 
    baseUrl: baseUrl,
    // 请求头信息 
    headers: { 'Content-Type': 'application/json;charset=UTF-8'}, ////'application/x-www-form-urlencoded;charset=UTF-8'
    // 参数 
    data: {},
    // 设置超时时间 
    timeout: 50000,
    // 携带凭证 
    withCredentials: false,
    // 返回数据类型 
    responseType: 'json'
}