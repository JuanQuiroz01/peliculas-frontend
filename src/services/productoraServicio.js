import { axiosInstance } from '../helper/axios-config';


const getproductora = () => {

    return axiosInstance.get('productoras', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createproductora = (data) => {

    return axiosInstance.post('productoras', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updateproductora = (idproductora, data) => {

    return axiosInstance.put(`productoras/${idproductora}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deleteproductora = (idproductora) => {

    return axiosInstance.delete(`productoras/${idproductora}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getproductora , createproductora, updateproductora, deleteproductora
}