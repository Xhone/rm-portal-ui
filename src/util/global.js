/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * this.Global调用
 */
export const baseUrl = 'http://localhost:8080'

export const backupBaseUrl = 'http://localhost:8090'

export default {
    baseUrl,
    backupBaseUrl
}