import { axiosInstance } from '../helper/axios-config';


const getdirector = () => {

    return axiosInstance.get('director', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createdirector = (data) => {

    return axiosInstance.get('director', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updatedirector = (directorId, data) => {

    return axiosInstance.get(`directores/${iddirector}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletedirector = (directorId) => {

    return axiosInstance.get(`directores/${iddirector}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getdirector , createdirector, updatedirector, deletedirector
}