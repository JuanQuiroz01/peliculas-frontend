import { axiosInstance } from '../helper/axios-config';


const getgenero = () => {

    return axiosInstance.get('genero', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const creategenero = (data) => {

    return axiosInstance.get('genero', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updategenero = (generoId, data) => {

    return axiosInstance.get(`generos/${idgenero}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletegenero = (generoId) => {

    return axiosInstance.get(`generos/${idgenero}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getgenero , creategenero, updategenero, deletegenero
}