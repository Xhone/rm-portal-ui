import axios from '../axios'

export const save=(data)=>{
    return axios({
        url:'/menu/save',
        method:'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
//查找导航菜单树
export const findNavTree=(params)=>{
    return axios({
        url:'/menu/findNavTree',
        method:'get',
        params
    })
}

// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}