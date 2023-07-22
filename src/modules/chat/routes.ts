import { PageName } from '@/common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import ChatPage from './pages/ChatPage.vue';

const chatRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.CHAT_PAGE,
                component: ChatPage,
                meta: {
                    public: false,
                },
            },
        ],
    },
];
export default chatRoutes;
