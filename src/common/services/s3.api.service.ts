import axios, { type AxiosRequestConfig } from 'axios';

class S3ApiService {
    putObject(url: string, object: any, options: AxiosRequestConfig) {
        return axios.put(url, object, options);
    }
}

export const s3ApiService = new S3ApiService();
