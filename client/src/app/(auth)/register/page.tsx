import RegisterForm from '~/app/(auth)/register/register-form';

function RegisterPage() {
    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-xl text-center font-semibold'>Trang Đăng Ký</h1>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
