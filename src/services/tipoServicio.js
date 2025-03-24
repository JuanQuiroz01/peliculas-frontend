import { axiosInstance } from '../helper/axios-config';


const gettipo = () => {

    return axiosInstance.get('tipo', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createtipo = (data) => {

    return axiosInstance.get('tipo', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updatetipo = (tipoId, data) => {

    return axiosInstance.get(`tipos/${idtipo}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletetipo = (tipoId) => {

    return axiosInstance.get(`tipos/${idtipo}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    gettipo , createtipo, updatetipo, deletetipo
}