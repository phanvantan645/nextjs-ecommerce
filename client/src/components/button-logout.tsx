'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import authApiRequest from '~/apiRequest/authRequest';
import { Button } from '~/components/ui/button';
import { handleErrorApi } from '~/lib/utils';

export default function ButtonLogout() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await authApiRequest.logoutFromNextClientToNextSerVer();
            router.push('/login');
        } catch (error) {
            handleErrorApi({
                error,
            });
            await authApiRequest.logoutFromNextClientToNextSerVer();
            router.push('/login');
        } finally {
            router.refresh();
        }
    };
    return (
        <Button size={'sm'} onClick={handleLogout}>
            Đăng xuất
        </Button>
    );
}
