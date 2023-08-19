import {
    IBodyResponse,
    ICommonGetListQuery,
    IGetListResponse,
} from '@/common/interfaces';
import service from '@/plugins/axios';
import { ApiService } from '@/plugins/axios/api';
import { ICreateTopic, ITopic } from '../interfaces';

class TopicApiService extends ApiService {
    getTopicsList(query: ICommonGetListQuery) {
        return this.client.get<
            IGetListResponse<ITopic>,
            IBodyResponse<IGetListResponse<ITopic>>
        >(`${this.baseUrl}`, { params: query });
    }
    createTopic(data: ICreateTopic) {
        return this.client.post<ITopic, IBodyResponse<ITopic>>(`${this.baseUrl}`, data);
    }
    deleteTopic(id: string) {
        return this.client.delete<void, IBodyResponse<ITopic>>(`${this.baseUrl}/${id}`);
    }
}

export const topicApiService = new TopicApiService({ baseUrl: '/topic' }, service);
