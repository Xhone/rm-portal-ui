import axios from '../axios'

export const getMpo=(params)=>{
    return axios({
        url:'api/Mpo/GetMpo',
        method:'get',
        params:params
    })
}

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

export const saveMpo=(data)=>{
    return axios({
        url:'api/Mpo/Save',
        method:'post',
        data:data,
        
    })
}

export const putMpo=(data)=>{
    return axios({
        url:'api/Mpo/PutMpo',
        method:'put',
        data:data,
        
    })
}

export const getJobData=()=>{
    return axios({
        url:'api/SGS/GetJobOrder',
        method:'get',
    })
}

export const getJobDataByFilter=(data)=>{
    return axios({
        url:'api/SGS/GetJobOrderByFilter',
        method:'get',
        params:data,
    })
}

export const deleteMpo=(params)=>{
    return axios({
        url:"api/Mpo/DeleteById",
        method:"delete",
        params:params,
    })
}