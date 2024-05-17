import http from '~/lib/http';
import {
    AccountResType,
    UpdateMeBodyType,
} from '~/schemaValidations/account.schema';
import {
    LoginBodyType,
    LoginResType,
    RegisterBodyType,
    RegisterResType,
    SlideSessionResType,
} from '~/schemaValidations/auth.schema';
import { MessageResType } from '~/schemaValidations/common.schema';

const authApiRequest = {
    login: (body: LoginBodyType) =>
        http.post<LoginResType>('/auth/login', body),
    register: (body: RegisterBodyType) =>
        http.post<RegisterResType>('/auth/register', body),
    auth: (body: { sessionToken: string; expiresAt: string }) =>
        http.post('/api/auth', body, { baseUrl: '' }),
    logoutFromNextServerToSerVer: (sessionToken: string) =>
        http.post<MessageResType>(
            '/auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        ),
    logoutFromNextClientToNextSerVer: (force?: boolean | undefined) =>
        http.post<MessageResType>(
            '/api/auth/logout',
            { force },
            {
                baseUrl: '',
            }
        ),
    slideSessionFromNextServerToServer: (sessionToken: string) =>
        http.post<SlideSessionResType>(
            '/auth/slide-session',
            {},
            { headers: { Authorization: `Bearer ${sessionToken}` } }
        ),
    sildeSessionFromNextClientToNextServer: () =>
        http.post<SlideSessionResType>(
            '/api/auth/slide-session',
            {},
            { baseUrl: '' }
        ),
    updateMe: (body: UpdateMeBodyType) =>
        http.put<AccountResType>('/account/me', body),
};

export default authApiRequest;
