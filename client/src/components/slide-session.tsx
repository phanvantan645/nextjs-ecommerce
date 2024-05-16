'use client';

import { useEffect } from 'react';
import authApiRequest from '~/apiRequest/authRequest';
import { clientSessionToken } from '~/lib/http';
import { differenceInHours } from 'date-fns';

export default function SlideSession() {
    useEffect(() => {
        const interval = setInterval(async () => {
            const now = new Date();
            const expiresAt = new Date(clientSessionToken.expiresAt);
            if (differenceInHours(expiresAt, now) < 1) {
                const res =
                    await authApiRequest.sildeSessionFromNextClientToNextServer();
                clientSessionToken.expiresAt = res.payload.data.expiresAt;
            }
        }, 1000 * 60 * 60);
        return () => clearInterval(interval);
    }, []);
    const sildeSesion = async () => {
        const res =
            await authApiRequest.sildeSessionFromNextClientToNextServer();
        clientSessionToken.expiresAt = res.payload.data.expiresAt;
    };
    return null;
}
