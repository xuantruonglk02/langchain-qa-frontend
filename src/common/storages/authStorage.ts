import { IGoogleCredentials } from '@/modules/auth/interfaces';
import { IUser } from '@/modules/user/interfaces';
import { isStringify } from '../helpers';
import localStorage from './localStorage';

export const enum AUTH_SERVICE_KEY {
    USER = 'USER',
    TOKENS = 'TOKENS',
}

class AuthLocalStorage {
    // logged user
    setLoggedUser(user: IUser | null) {
        if (!user) {
            localStorage.setLocalStorage(AUTH_SERVICE_KEY.USER, '');
            return;
        }
        if (!isStringify(user)) {
            return;
        }
        localStorage.setLocalStorage(AUTH_SERVICE_KEY.USER, JSON.stringify(user));
    }
    getLoggedUser(): IUser {
        return localStorage.getObjectFromKey(AUTH_SERVICE_KEY.USER) as IUser;
    }

    // tokens
    setTokens(tokens: IGoogleCredentials | null) {
        if (!tokens) {
            localStorage.setLocalStorage(AUTH_SERVICE_KEY.TOKENS, '');
            return;
        }
        if (!isStringify(tokens)) {
            return;
        }
        localStorage.setLocalStorage(AUTH_SERVICE_KEY.TOKENS, JSON.stringify(tokens));
    }
    getTokens(): IGoogleCredentials {
        return localStorage.getObjectFromKey(
            AUTH_SERVICE_KEY.TOKENS,
        ) as IGoogleCredentials;
    }

    resetAll(): void {
        this.setLoggedUser(null);
        this.setTokens(null);
    }
}

const authLocalStorage = new AuthLocalStorage();

export default authLocalStorage;
