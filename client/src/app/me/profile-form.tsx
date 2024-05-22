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
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '~/lib/utils';
import { useState } from 'react';
import {
    AccountResType,
    UpdateMeBody,
    UpdateMeBodyType,
} from '~/schemaValidations/account.schema';
import accountApiRequest from '~/apiRequest/account';

type ProfileType = AccountResType['data'];

function ProfileForm({ profile }: { profile: ProfileType }) {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<UpdateMeBodyType>({
        resolver: zodResolver(UpdateMeBody),
        defaultValues: {
            name: profile.name,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: UpdateMeBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await accountApiRequest.updateMe(values);
            toast({
                description: (
                    <div className='flex gap-1 items-center text-[#22c55e]'>
                        {result.payload.message}
                        <CheckCircledIcon className='size-4 ' />
                    </div>
                ),
            });
            router.refresh();
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
                <FormLabel>Email:</FormLabel>
                <FormControl className='pointer-events-none'>
                    <Input
                        placeholder='Email của bạn'
                        type='email'
                        value={profile.email}
                        readOnly
                    />
                </FormControl>
                <FormMessage />
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Nhập tên của bạn'
                                    type='text'
                                    autoComplete='on'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='!mt-8 w-full font-semibold'>
                    Cập nhật
                </Button>
            </form>
        </Form>
    );
}

export default ProfileForm;
