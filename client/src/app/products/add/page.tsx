import ProductAddForm from '~/app/products/_components/product-add-form';

export default function ProductPage() {
    return (
        <div className='flex items-center flex-col'>
            <h2 className='text-xl text-center font-semibold'>Thêm sản phẩm</h2>
            <ProductAddForm />
        </div>
    );
}
