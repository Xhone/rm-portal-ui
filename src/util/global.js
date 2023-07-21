/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * this.Global调用
 */
export var baseUrl = 'http://10.0.1.72:8090/'//
if(process.env.NODE_ENV=="development"){
    baseUrl='https://localhost:44311/';
}else if(process.env.NODE_ENV=='debug'){
    baseUrl='https://localhost:44311/';
}
else if(process.env.NODE_ENV=='production'){
    baseUrl = 'http://10.0.1.72:8090/'
}
if(!baseUrl.endsWith('/')){
    baseUrl+="/";
}
export const backupBaseUrl = 'http://localhost:8090'

export default {
    baseUrl,
    backupBaseUrl
}