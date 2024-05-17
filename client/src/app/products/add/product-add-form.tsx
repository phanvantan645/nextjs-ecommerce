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
import { useRef, useState } from 'react';
import {
    CreateProductBody,
    CreateProductBodyType,
} from '~/schemaValidations/product.schema';
import productApiRequest from '~/apiRequest/product';
import { Textarea } from '~/components/ui/textarea';
import Image from 'next/image';

function ProductAddForm() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const { toast } = useToast();
    const router = useRouter();
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    // 1. Define your form.
    const form = useForm<CreateProductBodyType>({
        resolver: zodResolver(CreateProductBody),
        defaultValues: {
            name: '',
            price: 0,
            description: '',
            image: '',
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: CreateProductBodyType) {
        if (loading) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file as Blob);
            const uploadImageResult = await productApiRequest.uploadImage(
                formData
            );
            const imageUrl = uploadImageResult.payload.data;
            const result = await productApiRequest.create({
                ...values,
                image: imageUrl,
            });
            router.push('/products');
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
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên sản phẩm:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Tên sản phẩm'
                                    type='text'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Giá sản phẩm'
                                    type='number'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả:</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Mô tả sản phẩm'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hình ảnh:</FormLabel>
                            <FormControl>
                                <Input
                                    ref={imageInputRef}
                                    type='file'
                                    placeholder='Hình ảnh sản phẩm'
                                    accept='image/*'
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFile(file);
                                            field.onChange(
                                                'http://localhost:3000/' +
                                                    file.name
                                            );
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {file && (
                    <div className='mt-2'>
                        <Image
                            src={URL.createObjectURL(file)}
                            width={128}
                            height={128}
                            alt='Preview'
                            className='w-32 h-32 object-cover'
                        />
                        <Button
                            type='button'
                            variant={'destructive'}
                            size={'sm'}
                            className='!mt-2'
                            onClick={() => {
                                setFile(null);
                                form.setValue('image', '');
                                if (imageInputRef.current) {
                                    imageInputRef.current.value = '';
                                }
                            }}
                        >
                            Xóa hình ảnh
                        </Button>
                    </div>
                )}
                <Button type='submit' className='!mt-8 w-full font-semibold'>
                    Thêm
                </Button>
            </form>
        </Form>
    );
}

export default ProductAddForm;
