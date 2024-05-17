import RegisterForm from '~/app/(auth)/register/register-form';

function RegisterPage() {
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-xl text-center font-semibold'>Trang Đăng Ký</h2>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
