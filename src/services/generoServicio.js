import { axiosInstance } from '../helper/axios-config';


const getgenero = () => {

    return axiosInstance.get('generos', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const creategenero = (data) => {

    return axiosInstance.post('generos', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updategenero = (idgenero, data) => {

    return axiosInstance.put(`generos/${idgenero}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletegenero = (idgenero) => {

    return axiosInstance.delete(`generos/${idgenero}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getgenero , creategenero, updategenero, deletegenero
}