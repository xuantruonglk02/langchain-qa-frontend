import { PageName } from '@/common/constants';
import NotFoundPage from '@/modules/errors/pages/NotFoundPage.vue';
import {
    createRouter,
    createWebHistory,
    type NavigationGuardWithThis,
    type RouteRecordRaw,
} from 'vue-router';
import AuthMiddleware from './middlewares/authMiddleware';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middlewares/middleware';
import { featureRoutes } from './routes';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/404',
        name: PageName.NOT_FOUND_PAGE,
        component: NotFoundPage,
        meta: {
            public: true,
        },
    },
    {
        path: '/:catchAll(.*)*',
        redirect: '/404',
    },
    ...featureRoutes,
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

router.beforeEach(
    VueRouteMiddleware({
        [GLOBAL_MIDDLEWARE_NAME]: AuthMiddleware,
    }) as NavigationGuardWithThis<unknown>,
);

export default router;
