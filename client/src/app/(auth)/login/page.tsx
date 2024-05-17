import LoginForm from '~/app/(auth)/login/login-form';

function Login() {
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-xl text-center font-semibold'>
                Trang Đăng Nhập
            </h2>
            <LoginForm />
        </div>
    );
}

export default Login;
