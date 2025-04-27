import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;
    const discountedPrice = product.is_discount
        ? product.price - Number(product.discount_amount)
        : product.price;

    return (
        <Link href={`/products/${product.unique_id}`} className='h-full'>
            <div className=" rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 bg-gray-100 pt-5 px-5 h-full lg:px-5 z-40">
                <div className="relative  w-full z-30">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        width={1000}
                        height={1000}
                        className="lg:w-[256px] mx-auto rounded-lg z-10"
                    />
                    <div className="flex justify-between mt-5">
                        {product.buying_price && (
                            <div className=" bg-gray-600 text-white px-1 py-1 rounded-md text-xs">
                                Save ৳ {product.discount_amount}
                            </div>
                        )}
                        <div className=" bg-yellow-500 text-white px-1 py-1 rounded-md text-xs z-50">
                            Stock: {product.stock} left
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{product.category.name}</span>
                        <span className="text-sm text-gray-500">Code: {product.code}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">{product.short_desc}</p>
                    <div className="mt-2 flex items-center justify-between">
                        <div>
                            {product.is_discount === 1 ? (
                                <div className="flex items-center gap-2">
                                    <p className="text-blue-600 font-bold">৳{discountedPrice}</p>
                                    <p className="text-gray-400 line-through text-sm">৳{product.price}</p>
                                </div>
                            ) : (
                                <p className="text-blue-600 font-bold">৳{product.price}</p>
                            )}
                        </div>
                        {product.pre_order && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                Pre-order
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;