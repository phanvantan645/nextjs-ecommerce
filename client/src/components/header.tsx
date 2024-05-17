import Link from 'next/link';
import ButtonLogout from '~/components/button-logout';
import { ToggleTheme } from '~/components/toggle-theme';

function Header() {
    return (
        <div>
            <ul>
                <li>
                    <Link href='/products/add'>Thêm sản phẩm</Link>
                </li>
                <li>
                    <Link href='/login'>Đăng Nhập</Link>
                </li>
                <li>
                    <Link href='/register'>Đăng ký</Link>
                </li>
                <li>
                    <ButtonLogout />
                </li>
            </ul>
            <ToggleTheme />
        </div>
    );
}

export default Header;
