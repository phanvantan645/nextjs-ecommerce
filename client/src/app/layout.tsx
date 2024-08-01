import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '~/components/theme-provider';
import Header from '~/components/header';
import { Toaster } from '~/components/ui/toaster';
import AppProvider from '~/app/app-provider';
import { cookies } from 'next/headers';
import SlideSession from '~/components/slide-session';
import accountApiRequest from '~/apiRequest/account';
import { AccountResType } from '~/schemaValidations/account.schema';

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
    title: 'Quản lý bán hàng',
    description: 'Được tạo bởi Văn Tấn',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    let user: AccountResType['data'] | null = null;
    if (sessionToken) {
        const profile = await accountApiRequest.me(sessionToken?.value);
        user = profile.payload.data;
    }
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={inter.className}>
                <Toaster />
                <ThemeProvider
                    attribute='class'
                    defaultTheme='system'
                    enableSystem
                    disableTransitionOnChange
                >
                    <AppProvider
                        initialSessionToken={sessionToken?.value}
                        user={user}
                    >
                        <Header user={user} />
                        <SlideSession />
                        {children}
                    </AppProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
