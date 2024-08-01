import productApiRequest from '~/apiRequest/product';
import ProductAddForm from '~/app/products/_components/product-add-form';

export default async function ProductEdit({
    params,
}: {
    params: { id: string };
}) {
    let product = undefined;
    try {
        const { payload } = await productApiRequest.getDetail(
            Number(params.id)
        );
        product = payload.data;
    } catch (error) {}
    return (
        <div className='flex justify-center'>
            <div className='w-[1280px] px-4'>
                {!product && <div>Không tìm thấy sản phẩm</div>}
                {product && <ProductAddForm product={product} />}
            </div>
        </div>
    );
}
