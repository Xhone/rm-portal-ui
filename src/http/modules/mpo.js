import axios from '../axios'

export const getMpoHd=(params)=>{
    return axios({
        url:'api/Mpo/GetMpoHd',
        method:'get',
        params:params
    })
}