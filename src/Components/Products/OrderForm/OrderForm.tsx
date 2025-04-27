"use client";
import { useState } from 'react';
import axios from 'axios';

interface OrderFormProps {
    productId: number;
    productPrice: number;
    onClose: () => void;
    onSuccess: () => void;
}

interface OrderFormData {
    c_name: string;
    c_phone: string;
    address: string;
    courier: string;
    product_ids: string;
    s_product_qty: string;
    cod_amount: string;
    delivery_charge: string;
    advance: string | null;
    discount_amount: string | null;
}

export default function OrderForm({ productId, productPrice, onClose, onSuccess }: OrderFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<OrderFormData>({
        c_name: '',
        c_phone: '',
        address: '',
        courier: 'steadfast',
        product_ids: productId.toString(),
        s_product_qty: '1',
        cod_amount: productPrice.toString(),
        delivery_charge: '80',
        advance: null,
        discount_amount: null
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderPayload = {
                product_ids: productId.toString(),
                s_product_qty: "1",
                c_phone: formData.c_phone,
                c_name: formData.c_name,
                courier: "steadfast",
                address: formData.address,
                advance: null,
                cod_amount: productPrice.toString(),
                discount_amount: null,
                delivery_charge: "80"
            };

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_POST_URL}/public/order/create`,
                orderPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );


            if (response.data.message === 'Order placed Successfully!') {
                onSuccess();
            } else {
                setError(response.data.message || 'Failed to place order. Please try again.');
            }
        } catch (err: any) {
            console.error('Order error:', err.response?.data || err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="border p-2 rounded"
                        value={formData.c_name}
                        onChange={(e) => setFormData({...formData, c_name: e.target.value})}
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        className="border p-2 rounded"
                        value={formData.c_phone}
                        onChange={(e) => setFormData({...formData, c_phone: e.target.value})}
                    />
                </div>
                <textarea
                    placeholder="Delivery Address"
                    required
                    className="w-full border p-2 rounded"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                <div className="flex justify-between items-center">
                    <div className="space-x-2 space-y-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Placing Order...' : 'Confirm Order'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 cursor-pointer text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Delivery Charge: ৳{formData.delivery_charge}</p>
                        <p className="font-semibold">
                            Total: ৳{Number(formData.cod_amount) + Number(formData.delivery_charge)}
                        </p>
                    </div>
                </div>
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
            </form>
        </div>
    );
}