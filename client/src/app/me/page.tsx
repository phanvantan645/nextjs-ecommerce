import { cookies } from 'next/headers';
import ProfileForm from '~/app/me/profile-form';
import accountApiRequest from '~/apiRequest/account';

export default async function MyProfile() {
    const cockieStore = cookies();
    const sessionToken = cockieStore.get('sessionToken');
    const result = await accountApiRequest.me(sessionToken?.value ?? '');
    return (
        <div className='flex items-center flex-col'>
            <h2 className='text-xl text-center font-semibold'>Trang cá nhân</h2>
            <ProfileForm profile={result.payload.data} />
        </div>
    );
}
