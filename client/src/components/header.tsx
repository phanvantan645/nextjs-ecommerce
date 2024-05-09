import Link from 'next/link';
import { ToggleTheme } from '~/components/toggle-theme';

function Header() {
    return (
        <div>
            <ul>
                <li>
                    <Link href='/login'>Đăng Nhập</Link>
                </li>
                <li>
                    <Link href='/register'>Đăng ký</Link>
                </li>
            </ul>
            <ToggleTheme />
        </div>
    );
}

export default Header;
