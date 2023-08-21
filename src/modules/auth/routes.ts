import { PageName } from '@/common/constants';
import MainLayout from '@/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from './pages/LoginPage.vue';
import LoginWithGoogle from './pages/LoginWithGoogle.vue';

const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        children: [
            {
                path: 'login',
                name: PageName.LOGIN_PAGE,
                component: LoginPage,
                meta: {
                    public: true,
                    onlyWhenLoggedOut: true,
                },
            },
            {
                path: 'login/google',
                name: PageName.LOGIN_WITH_GOOGLE,
                component: LoginWithGoogle,
                meta: {
                    public: true,
                    onlyWhenLoggedOut: true,
                },
            },
        ],
    },
];
export default authRoutes;
