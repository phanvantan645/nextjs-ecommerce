import { Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import productApiRequest from '~/apiRequest/product';
import DeleteProduct from '~/app/products/_components/delete-product';
import { Button } from '~/components/ui/button';
import { numberWithCommas } from '~/lib/utils';

export default async function ProductListPage() {
    const { payload } = await productApiRequest.getList();
    const productList = payload.data;
    return (
        <div className='flex justify-center'>
            <div className='w-[1280px] px-4 pt-4 flex flex-col items-center'>
                <h2>Danh sách sản phẩm:</h2>
                <div className='w-[800px]'>
                    {productList.map(product => (
                        <div
                            key={product.id}
                            className='flex justify-between items-center py-2'
                        >
                            <div className='flex'>
                                <Image
                                    className='object-cover mr-2'
                                    width={50}
                                    height={50}
                                    src={product.image}
                                    alt={product.name}
                                />
                                <div>
                                    <p>Tên: {product.name}</p>
                                    <p>
                                        Giá: {numberWithCommas(product.price)}{' '}
                                        vnđ
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Link
                                    href={`/products/${product.id}`}
                                    className='mr-2'
                                >
                                    <Button>
                                        <Pencil1Icon />
                                        <span className='ml-1'>Sửa</span>
                                    </Button>
                                </Link>
                                <DeleteProduct product={product} />
                            </div>
                        </div>
                    ))}
                    <Link href='/products/add'>
                        <Button className='mt-3'>
                            <PlusIcon />
                            <span className='ml-1'>Thêm sản phẩm</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
