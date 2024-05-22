import { cookies } from 'next/headers';
import Link from 'next/link';
import accountApiRequest from '~/apiRequest/account';
import ButtonLogout from '~/components/button-logout';
import { ToggleTheme } from '~/components/toggle-theme';

async function Header() {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get('sessionToken');
    let user = null;
    if (sessionToken) {
        const profile = await accountApiRequest.me(sessionToken?.value);
        user = profile.payload.data;
    }
    return (
        <div className='flex justify-center w-[100%]'>
            <div className='w-[1280px] h-[60px] px-4 flex items-center justify-between'>
                <Link href='/' className='font-black text-5xl'>
                    Shop
                </Link>
                <ul className='flex gap-4 h-[100%] items-center justify-end'>
                    <li>
                        <Link href='/products'>Tất cả sản phẩm</Link>
                    </li>
                    {user ? (
                        <>
                            <li className='flex items-center'>
                                <div className='flex mr-2'>
                                    <span>Xin chào</span>
                                    <Link
                                        href='/me'
                                        className='font-semibold ml-1'
                                    >
                                        {user.name}
                                    </Link>
                                </div>
                                <ButtonLogout />
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href='/login'>Đăng Nhập</Link>
                            </li>
                            <li>
                                <Link href='/register'>Đăng ký</Link>
                            </li>
                        </>
                    )}
                </ul>
                <div className='fixed right-4 bottom-4'>
                    <ToggleTheme />
                </div>
            </div>
        </div>
    );
}

export default Header;
