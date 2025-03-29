import { axiosInstance } from '../helper/axios-config';


const getdirector = () => {

    return axiosInstance.get('directores', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createdirector = (data) => {

    return axiosInstance.post('directores', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updatedirector = (iddirector, data) => {

    return axiosInstance.put(`directores/${iddirector}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletedirector = (iddirector) => {

    return axiosInstance.delete(`directores/${iddirector}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getdirector , createdirector, updatedirector, deletedirector
}