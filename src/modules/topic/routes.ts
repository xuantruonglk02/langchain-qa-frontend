import { PageName } from '@/common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import TopicPage from './pages/TopicPage.vue';

const topicRoutes: Array<RouteRecordRaw> = [
    {
        path: '/topic',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.TOPIC_PAGE,
                component: TopicPage,
                meta: {
                    public: false,
                },
            },
        ],
    },
];
export default topicRoutes;
