import LoginForm from '~/app/(auth)/login/login-form';

function Login() {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-xl text-center font-semibold'>
                Trang Đăng Nhập
            </h1>
            <LoginForm />
        </div>
    );
}

export default Login;
