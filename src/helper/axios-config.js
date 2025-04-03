import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://movie-api-backend-urao.onrender.com'
    //baseURL: 'http://localhost:4000/'
});

export{
    axiosInstance
}
