import { IBodyResponse } from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IMessage } from '../interfaces';

class ChatApiService extends ApiService {
    chat(conversationId: string, message: string) {
        return this.client.post<IMessage, IBodyResponse<IMessage>>(`${this.baseUrl}`, {
            conversationId,
            message,
        });
    }
}

export const chatApiService = new ChatApiService({ baseUrl: '/chat' }, service);
