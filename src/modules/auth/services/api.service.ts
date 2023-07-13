import { IBodyResponse } from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { ILoginWithGoogle, ILoginWithGoogleBody } from '../interfaces';

class AuthApiService extends ApiService {
    getGoogleLoginUrl() {
        return this.client.get<{ loginUrl: string }, IBodyResponse<{ loginUrl: string }>>(
            `${this.baseUrl}/login/google`,
        );
    }
    loginWithGoogle(body: ILoginWithGoogleBody) {
        return this.client.post<ILoginWithGoogle, IBodyResponse<ILoginWithGoogle>>(
            `${this.baseUrl}/login/google`,
            body,
        );
    }
}

export const authApiService = new AuthApiService({ baseUrl: '/auth' }, service);
