'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
import { CheckCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from '~/components/ui/button';
import { ProductResType } from '~/schemaValidations/product.schema';
import productApiRequest from '~/apiRequest/product';
import { handleErrorApi } from '~/lib/utils';
import { useToast } from '~/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function DeleteProduct({
    product,
}: {
    product: ProductResType['data'];
}) {
    const { toast } = useToast();
    const router = useRouter();
    const deleteProduct = async () => {
        try {
            const result = await productApiRequest.delete(product.id);
            router.refresh();
            toast({
                description: (
                    <div className='flex gap-1 items-center text-[#22c55e]'>
                        {result.payload.message}
                        <CheckCircledIcon className='size-4 ' />
                    </div>
                ),
            });
        } catch (error) {
            handleErrorApi({ error });
        }
    };

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={'destructive'}>
                        <TrashIcon />
                        <span className='ml-1 spac'>Xóa</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Bạn có muốn xóa sản phẩm không?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {product &&
                                `Sản phẩm "${product.name}" bị xóa và sẽ không thể khôi phục lại.
                            Bạn có chắc chắn?`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Không</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteProduct}>
                            Tiếp tục xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
