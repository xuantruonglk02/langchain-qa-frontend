import { PageName } from '@/common/constants';
import authLocalStorage from '@/common/storages/authStorage';
import moment from 'moment';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
): Promise<void> => {
    const isPublic = to?.meta?.public || false;
    const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false;

    const loggedUser = authLocalStorage.getLoggedUser();
    const token = authLocalStorage.getTokens();

    let loggedIn = true;
    if (!loggedUser.email || !token.token) {
        loggedIn = false;
    }

    const expireDate = new Date(authLocalStorage.getTokens().expiresIn);
    if (moment(expireDate).isSameOrBefore(new Date())) {
        loggedIn = false;
    }

    if (isPublic) {
        // Do not allow user to visit entry page if they are logged in
        if (onlyWhenLoggedOut && loggedIn) {
            return next({ name: PageName.CHAT_PAGE });
        }
        return next();
    }

    if (!isPublic && !loggedIn) {
        return next({
            name: PageName.LOGIN_PAGE,
            query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
        });
    }

    return next();
};
