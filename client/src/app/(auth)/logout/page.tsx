'use client';

import { CheckCircledIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import authApiRequest from '~/apiRequest/authRequest';
import { toast } from '~/components/ui/use-toast';
import { clientSessionToken } from '~/lib/http';

export default function Logout() {
    const router = useRouter();
    const searchParam = useSearchParams();
    const sessionToken = searchParam.get('sessionToken');
    useEffect(() => {
        if (sessionToken === clientSessionToken.value) {
            authApiRequest.logoutFromNextClientToNextSerVer(true).then(res => {
                router.push('/login');
                toast({
                    description: (
                        <div className='flex gap-1 items-center text-[#22c55e]'>
                            {res.payload.message}
                            <CheckCircledIcon className='size-4 ' />
                        </div>
                    ),
                });
            });
        }
    }, [sessionToken, router]);
    return <div>Logout</div>;
}
