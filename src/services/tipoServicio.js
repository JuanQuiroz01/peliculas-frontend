import { axiosInstance } from '../helper/axios-config';


const gettipo = () => {

    return axiosInstance.get('tipos', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createtipo = (data) => {

    return axiosInstance.post('tipos', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updatetipo = (idtipo, data) => {

    return axiosInstance.put(`tipos/${idtipo}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deletetipo = (idtipo) => {

    return axiosInstance.delete(`tipos/${idtipo}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    gettipo , createtipo, updatetipo, deletetipo
}