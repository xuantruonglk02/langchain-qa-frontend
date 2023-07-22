import authLocalStorage from '@/common/storages/authStorage';
import type { AxiosRequestConfig } from 'axios';
import { HttpMiddleware } from './httpMiddleware';

export default class AuthMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        // set authorization
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${authLocalStorage.getTokens().token}`,
        };

        return config;
    }
}
