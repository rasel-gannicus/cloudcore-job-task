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
            <div className="group rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-xl bg-white pt-5 px-5 h-full lg:px-5 z-40">
                <div className="relative w-full z-30">
                    <div className="relative overflow-hidden rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            width={1000}
                            height={1000}
                            className="lg:w-[256px] mx-auto rounded-lg z-10 transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex justify-between mt-5 gap-2">
                        {product.buying_price && (
                            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                Save ৳ {product.discount_amount}
                            </div>
                        )}
                        <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                            {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">{product.category.name}</span>
                        <span className="text-sm text-gray-500">Code: {product.code}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">{product.name}</h3>
                    <p className="text-gray-600 mt-2 line-clamp-2 text-sm">{product.short_desc}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <div>
                            {product.is_discount === 1 ? (
                                <div className="flex items-center gap-2">
                                    <p className="text-2xl font-bold text-blue-600">৳{discountedPrice}</p>
                                    <p className="text-gray-400 line-through text-sm">৳{product.price}</p>
                                </div>
                            ) : (
                                <p className="text-2xl font-bold text-blue-600">৳{product.price}</p>
                            )}
                        </div>
                        {product.pre_order && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full font-medium">
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