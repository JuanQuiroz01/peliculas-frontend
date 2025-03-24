import { axiosInstance } from '../helper/axios-config';


const getmedia = () => {

    return axiosInstance.get('media', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createmedia = (data) => {

    return axiosInstance.post('media', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updatemedia = (idmedia, data) => {

    return axiosInstance.put(`media/${idmedia}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletemedia = (idmedia) => {

    return axiosInstance.delete(`media/${idmedia}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getmedia , createmedia, updatemedia, deletemedia
}