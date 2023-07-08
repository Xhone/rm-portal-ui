import axios from '../axios'

export const getSupplier=()=>{
    return axios({
        url:'api/SGS/GetSupplier',
        method:'get',
    })
}

export const getSumPoData=(data)=>{
    return axios({
        url:'api/SGS/GetSumPo',
        method:'post',
        data:data
    })
}

export const getSurType=()=>{
    return axios({
        url:'api/SGS/GetSurType',
        method:'get',

    })
}

export const getTerms=()=>{
    return axios({
        url:'api/SGS/GetTerms',
        method:'get',
    })
}

export const getPayment=()=>{
    return axios({
        url:'api/SGS/GetPayment',
        method:'get',
    })
}

export const getCcy=()=>{
    return axios({
        url:'api/SGS/GetCcy',
        method:'get',
    })
}

export const getShipped=()=>{
    return axios({
        url:'api/SGS/GetShipped',
        method:'get',
    })
}