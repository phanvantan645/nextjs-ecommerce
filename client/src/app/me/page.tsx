import { cookies } from 'next/headers';
import Profile from '~/app/me/profile';
import accountApiRequest from '~/apiRequest/account';

export default async function MyProfile() {
    const cockieStore = cookies();
    const sessionToken = cockieStore.get('sessionToken');
    const result = await accountApiRequest.me(sessionToken?.value ?? '');
    return (
        <div>
            <h1>Xin chào {result.payload.data.name}</h1>
            <Profile />
        </div>
    );
}
