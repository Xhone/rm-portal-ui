import axios from '../axios'

export const getAll=()=>{
    return axios({
        url:'api/User',
        method:'get',
       
    })
}

export const getUser=(params)=>{
    return axios({
        url:'api/User/GetUserByName',
        method:'get',
        params:params
    })
}

export const save=(data)=>{
    return axios({
        url:'api/User/Save',
        method:'post',
        data:data,
        
    })
}

export const putUser=(data)=>{
    return axios({
        url:'api/User/PutUser',
        method:'put',
        data:data,
        
    })
}

export const deleteUser=(params)=>{
    return axios({
        url:'api/User/Delete',
        method:'delete',
        params:params,
    })
}