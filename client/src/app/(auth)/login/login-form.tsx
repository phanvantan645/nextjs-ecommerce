'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircledIcon } from '@radix-ui/react-icons';
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
import { LoginBodyType, LoginBody } from '~/schemaValidations/auth.schema';
import authApiRequest from '~/apiRequest/authRequest';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '~/lib/utils';
import { useState } from 'react';

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: LoginBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.login(values);
            await authApiRequest.auth({
                sessionToken: result.payload.data.token,
                expiresAt: result.payload.data.expiresAt,
            });
            router.refresh();
            toast({
                description: (
                    <div className='flex gap-1 items-center text-[#22c55e]'>
                        {result.payload.message}
                        <CheckCircledIcon className='size-4 ' />
                    </div>
                ),
            });
        } catch (error: any) {
            handleErrorApi({ error, setError: form.setError });
        } finally {
            setLoading(false);
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
                <Button type='submit' className='!mt-8 w-full font-semibold'>
                    Đăng nhập
                </Button>
            </form>
        </Form>
    );
}

export default LoginForm;
