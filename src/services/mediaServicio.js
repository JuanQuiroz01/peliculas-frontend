import { axiosInstance } from '../helper/axios-config';

const getmedia = () => {
    return axiosInstance.get('media', {
        headers: { 'Content-type': 'application/json' }
    });
};

const getmediabyid = (id) => {
    return axiosInstance.get(`media/${id}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

const createmedia = (data) => {
    return axiosInstance.post('media', data, {
        headers: { 'Content-type': 'application/json' }
    });
};

const updatemedia = (id, data) => {
    return axiosInstance.put(`media/${id}`, data, {
        headers: { 'Content-type': 'application/json' }
    });
};

const deletemedia = (id) => {
    return axiosInstance.delete(`media/${id}`, {
        headers: { 'Content-type': 'application/json' }
    });
};

export {
    getmedia,
    getmediabyid,
    createmedia,
    updatemedia,
    deletemedia
};