import axios from '../axios'


export const packListSelect = (params) => {
    return axios({
        url: 'api/PackList/GetPackList',
        method: 'get',
        params:params,
    })
}

export const SavePage = (data) => {
    return axios({
        url: 'api/PackList/SavePages',
        method: 'post',
        headers:{"Content-Type":"application/json"},
        data:data,
    })
}



export const doMarkDN = (params) => {
    return axios({
        url: 'api/PackList/GetMarkDN',
        method: 'get',
        params:params,
    })
}


export const doMarkAdJustMent=(params)=>{
    return axios({
        url:'api/PackList/GetStkAdj',
        method:'get',
        params:params,
    })
}



export const uploadSectionFile = (data) => {
    return axios({
        url: 'api/PackList/uploadFTP',
        method: 'post',
        headers:{"Content-Type":"application/json"},
        data:data,
    })
}

export const exportPackListExcel=(params)=>{
    return axios({
        url:'api/PackList/GetPackListExcel',
        method:'get',
        params:params,
    })
}
export const getPoExcel=(params)=>{
    return axios({
        url:'api/PackList/GetPOExcel',
        method:'get',
        params:params,
    })
}



export const packlistselect = (data) => {
    return axios({
        url: 'api/PackList/SelectSomePackList',
        method: 'post',
        headers:{"Content-Type":"application/json"},
        data:data,
    })
}



export const packlistAllselect = () => {
    return axios({
        url: 'api/PackList/selectPackList',
        method: 'post',
        headers:{"Content-Type":"application/json"},
   
    })
}



