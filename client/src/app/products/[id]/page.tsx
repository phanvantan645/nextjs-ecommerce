import Image from 'next/image';
import React from 'react';
import productApiRequest from '~/apiRequest/product';
import { numberWithCommas } from '~/lib/utils';

const ProductDetail = async ({ params }: { params: { id: string } }) => {
    let product = undefined;
    try {
        const { payload } = await productApiRequest.getDetail(
            Number(params.id)
        );
        product = payload.data;
    } catch (error) {}
    return (
        <div className='flex justify-center px-12 pt-4'>
            <div className='w-[1280px] px-4'>
                {!product && <div>Không tìm thấy sản phẩm</div>}
                {product && (
                    <>
                        <div className='flex'>
                            <Image
                                className='object-cover mr-2 w-1/2'
                                width={720}
                                height={720}
                                src={product.image}
                                alt={product.name}
                            />
                            <div>
                                <h2>{product.name}</h2>
                                <h2>{numberWithCommas(product.price)} vnđ</h2>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
