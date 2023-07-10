import { IBodyResponse } from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IChatResponse } from '../interfaces';

class ChatApiService extends ApiService {
    chat(message: string) {
        return this.client.post<IChatResponse, IBodyResponse<IChatResponse>>(
            `${this.baseUrl}`,
            { message },
        );
    }
}

export const chatApiService = new ChatApiService({ baseUrl: '/chat' }, service);
