'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/components/ui/use-toast';
import envConfig from '~/config';
import {
    RegisterBody,
    RegisterBodyType,
} from '~/schemaValidations/auth.schema';

function RegisterForm() {
    const { toast } = useToast();
    // 1. Define your form.
    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterBodyType) {
        try {
            const result = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
                {
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                }
            ).then(async response => {
                const payload = await response.json();
                const data = {
                    status: response.status,
                    payload,
                };
                if (!response.ok) {
                    throw data;
                }
                return data;
            });
            toast({
                description: (
                    <div className='flex gap-1 items-center text-[#22c55e]'>
                        {result.payload.message}
                        <CheckCircledIcon className='size-4' />
                    </div>
                ),
            });
        } catch (error: any) {
            toast({
                variant: 'destructive',
                description: 'Địa chỉ Email đã được đăng ký!',
            });
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-2  max-w-[500px] flex-shrink-0 w-full'
                noValidate
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field, formState: { errors } }) => (
                        <FormItem>
                            <FormLabel>Tên:</FormLabel>
                            <FormControl>
                                <Input placeholder='Tên của bạn' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Email của bạn'
                                    type='email'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Mật khẩu của bạn'
                                    type='password'
                                    autoComplete='on'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nhập lại mật khẩu:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Nhập lại mật khẩu'
                                    type='password'
                                    autoComplete='on'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='!mt-8 w-full font-semibold'>
                    Đăng ký
                </Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
