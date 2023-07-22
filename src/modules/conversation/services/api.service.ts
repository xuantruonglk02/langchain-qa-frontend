import {
    IBodyResponse,
    ICommonGetListQuery,
    IGetListResponse,
} from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { IConversation } from '../interfaces';

class ConversationApiService extends ApiService {
    getConversationList(query: ICommonGetListQuery) {
        return this.client.get<
            IGetListResponse<IConversation>,
            IBodyResponse<IGetListResponse<IConversation>>
        >(`${this.baseUrl}`, { params: query });
    }
    getMessageList(conversationId: string, query: ICommonGetListQuery) {
        return this.client.get<
            IGetListResponse<IConversation>,
            IBodyResponse<IGetListResponse<IConversation>>
        >(`${this.baseUrl}/${conversationId}/message`, { params: query });
    }
}

export const conversationApiService = new ConversationApiService(
    { baseUrl: '/conversation' },
    service,
);
