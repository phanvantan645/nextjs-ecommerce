'use client';

import { ReactNode, useLayoutEffect, useState } from 'react';
import { clientSessionToken } from '~/lib/http';

export default function AppProvider({
    children,
    initialSessionToken = '',
}: {
    children: ReactNode;
    initialSessionToken?: string;
}) {
    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = initialSessionToken;
        }
    });
    return <>{children}</>;
}
