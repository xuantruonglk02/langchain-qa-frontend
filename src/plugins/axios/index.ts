import axios, { type AxiosRequestConfig } from 'axios';
import CommonMiddleware from './middlewares/commonMiddleware';
import HttpMiddlewareService from './service';

const options: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    responseType: 'json',
};

const axiosInstance = axios.create(options);

const axiosService = new HttpMiddlewareService(axiosInstance);
axiosService.register([new CommonMiddleware()]);

export default axiosInstance;
