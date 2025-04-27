"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Product } from '@/types/product';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Add to imports
import OrderForm from '../OrderForm/OrderForm';

export default function SingleProduct() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Add these two state variables
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('https://admin.refabry.com/api/all/product/get');
                const foundProduct = response.data.data.data.find(
                    (p: Product) => p.unique_id === params.id
                );
                console.log('Found Product:', foundProduct); // Add this for debugging
                console.log('Params ID:', params.id); // Add this for debugging
                if (foundProduct) {
                    setProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="text-center text-red-500 py-10">
                {error || 'Product not found'}
            </div>
        );
    }

    const imageUrl = `https://admin.refabry.com/storage/product/${product.image}`;
    const discountedPrice = product.is_discount
        ? product.price - Number(product.discount_amount)
        : product.price;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                href="/"
                className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Products
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-[500px] w-full">
                    <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain rounded-lg"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {product.is_discount === 1 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md">
                            Save ৳{product.discount_amount}
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                            {product.category.name}
                        </span>
                        <span className="text-gray-500 text-sm">Code: {product.code}</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    <div className="mt-4">
                        {product.is_discount === 1 ? (
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-bold text-blue-600">৳{discountedPrice}</span>
                                <span className="text-xl text-gray-400 line-through">৳{product.price}</span>
                            </div>
                        ) : (
                            <span className="text-3xl font-bold text-blue-600">৳{product.price}</span>
                        )}
                    </div>

                    <div className="mt-6 prose prose-sm text-gray-500">
                        <p className="whitespace-pre-line">{product.short_desc}</p>
                    </div>

                    <div className="mt-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">Stock:</span>
                            <span className={`${product.stock <= 10 ? 'text-red-500' : 'text-green-500'}`}>
                                {product.stock} units available
                            </span>
                        </div>
                        {product.pre_order && (
                            <div className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded">
                                Pre-order Available
                            </div>
                        )}
                    </div>


                    <div className="mt-8">
                        {!showOrderForm ? (
                            <button
                                onClick={() => setShowOrderForm(true)}
                                className="w-full cursor-pointer md:w-auto bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Place Order
                            </button>
                        ) : (
                            <OrderForm
                                productId={product.id}
                                productPrice={discountedPrice}
                                onClose={() => setShowOrderForm(false)}
                                onSuccess={() => {
                                    setOrderSuccess(true);
                                    setShowOrderForm(false);
                                }}
                            />
                        )}
                        {orderSuccess && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                                Order placed successfully! We will contact you shortly.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}