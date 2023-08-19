import { PageName } from '@/common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import CheckDocumentPage from './pages/CheckDocumentPage.vue';

const documentRoutes: Array<RouteRecordRaw> = [
    {
        path: '/document',
        component: MainLayout,
        children: [
            {
                path: '/check',
                name: PageName.CHECK_DOCUMENT_PAGE,
                component: CheckDocumentPage,
                meta: {
                    public: false,
                },
            },
        ],
    },
];
export default documentRoutes;
