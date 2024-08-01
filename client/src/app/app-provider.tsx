'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import { clientSessionToken } from '~/lib/http';
import { AccountResType } from '~/schemaValidations/account.schema';

type User = AccountResType['data'];

const AppContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({ user: null, setUser: (user: User | null) => {} });

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
};

export default function AppProvider({
    children,
    initialSessionToken = '',
    user: userProps,
}: {
    children: ReactNode;
    initialSessionToken?: string;
    user: User | null;
}) {
    const [user, setUser] = useState<User | null>(userProps);
    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = initialSessionToken;
        }
    });
    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
}
