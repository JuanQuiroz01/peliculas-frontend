import { axiosInstance } from '../helper/axios-config';


const getproductora = () => {

    return axiosInstance.get('productora', {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const createproductora = (data) => {

    return axiosInstance.get('productora', data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const updateproductora = (productoraId, data) => {

    return axiosInstance.get(`productoras/${idproductora}`,data, {
        headers:{
            'Content-type':'application/json'
        }
    });

}
const deleteproductora = (productoraId) => {

    return axiosInstance.get(`productoras/${idproductora}`, {
        headers:{
            'Content-type':'application/json'
        }
    });

}

export {
    getproductora , createproductora, updateproductora, deleteproductora
}