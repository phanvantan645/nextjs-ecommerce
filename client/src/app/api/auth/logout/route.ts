import { cookies } from 'next/headers';
import authApiRequest from '~/apiRequest/authRequest';
import { HttpError } from '~/lib/http';

export async function POST(request: Request) {
    const res = await request.json();
    const force = res.force as boolean | undefined;
    if (force) {
        return Response.json(
            { message: 'Buộc đăng xuất thành công' },
            {
                status: 200,
                headers: {
                    'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; Max-Age=0',
                },
            }
        );
    }
    const cookiesStore = cookies();
    const sessionToken = cookiesStore.get('sessionToken');
    if (!sessionToken) {
        return Response.json(
            { message: 'Không nhận được session token' },
            {
                status: 400,
            }
        );
    }
    try {
        const result = await authApiRequest.logoutFromNextServerToSerVer(
            sessionToken.value
        );
        return Response.json(result.payload, {
            status: 200,
            headers: {
                'Set-Cookie': 'sessionToken=; Path=/; HttpOnly; Max-Age=0',
            },
        });
    } catch (error) {
        if (error instanceof HttpError) {
            return Response.json(error.payload, {
                status: error.status,
            });
        } else {
            return Response.json(
                { message: 'Lỗi không xác định!' },
                {
                    status: 500,
                }
            );
        }
    }
}
