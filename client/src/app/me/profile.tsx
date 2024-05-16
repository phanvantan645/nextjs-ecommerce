'use client';

import { useEffect } from 'react';
import accountApiRequest from '~/apiRequest/account';
import { handleErrorApi } from '~/lib/utils';

export default function Profile() {
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await accountApiRequest.meClient();
                console.log(result);
            } catch (error) {
                handleErrorApi({
                    error,
                });
            }
        };
        fetchProfile();
    }, []);

    return <div>Profile</div>;
}
