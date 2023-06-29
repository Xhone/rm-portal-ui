import axios from '../axios'

export const getMpoHd=(params)=>{
    return axios({
        url:'api/Mpo/GetMpoHd',
        method:'get',
        params:params
    })
}

export const getMpoView=(params)=>{
    return axios({
        url:'api/Mpo/GetMpoView',
        method:'get',
        params:params
    })
}

export const saveMpo=(params)=>{
    return axios({
        url:'api/Mpo/Save',
        method:'post',
        params:params,
        
    })
}