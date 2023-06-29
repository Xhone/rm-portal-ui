import axios from '../axios'

export const getUser=(params)=>{
    return axios({
        url:'api/User/GetUserByName',
        method:'get',
        params:params
    })
}

export const save=(params)=>{
    return axios({
        url:'api/User/Save',
        method:'post',
        data:params,
        
    })
}