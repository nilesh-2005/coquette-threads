import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Checkout() {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();

    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const [step, setStep] = useState(1); // 1=shipping, 2=payment, 3=confirm
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingPrice = subtotal > 5000 ? 0 : 500;
    const taxPrice = Math.round(subtotal * 0.18);
    const totalPrice = subtotal + shippingPrice + taxPrice;

    const paymentOptions = [
        { id: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive your order' },
        { id: 'UPI', label: 'UPI Payment', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
        { id: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
        { id: 'NetBanking', label: 'Net Banking', icon: '🏦', desc: 'All major banks supported' },
    ];

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
    };

    const placeOrder = async () => {
        if (!paymentMethod) {
            setError('Please select a payment method');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item._id,
                    title: item.title,
                    qty: item.quantity,
                    image: item.images?.[0]?.url || '',
                    price: item.price,
                    size: item.size
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice
            };

            const { data } = await api.post('/orders', orderData);

            // For non-COD, simulate payment success
            if (paymentMethod !== 'COD') {
                await api.put(`/orders/${data._id}/pay`, {
                    id: `SIM_${Date.now()}`,
                    status: 'COMPLETED',
                    update_time: new Date().toISOString(),
                    email_address: user.email
                });
            }

            clearCart();
            router.push(`/account?orderSuccess=${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Order failed');
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#faf9f6] pt-32 pb-20 px-4 md:px-0 font-serif">
                <Head>
                    <title>Checkout | Coquette Threads</title>
                </Head>

                <div className="container mx-auto max-w-4xl">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-12 space-x-4">
                        {['Shipping', 'Payment', 'Confirm'].map((label, i) => (
                            <div key={label} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans transition-all ${step > i + 1 ? 'bg-green-600 text-white' : step === i + 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {step > i + 1 ? '✓' : i + 1}
                                </div>
                                <span className={`ml-2 text-xs uppercase tracking-widest ${step === i + 1 ? 'text-black' : 'text-gray-400'}`}>{label}</span>
                                {i < 2 && <div className={`w-12 h-px mx-4 ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
                            </div>
                        ))}
                    </div>

                    <h1 className="text-3xl tracking-widest uppercase text-center mb-12">
                        {step === 1 ? 'Shipping Details' : step === 2 ? 'Payment Method' : 'Confirm Order'}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Panel */}
                        <div>
                            {step === 1 && (
                                <form onSubmit={handleShippingSubmit} className="space-y-6 font-sans">
                                    {Object.keys(shippingAddress).map((key) => (
                                        <div key={key}>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{key}</label>
                                            <input
                                                type="text"
                                                required
                                                value={shippingAddress[key]}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, [key]: e.target.value })}
                                                className="w-full border-b border-gray-300 py-2 bg-transparent focus:border-black outline-none transition-colors"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] hover:bg-gray-800 transition-all mt-8 text-xs"
                                    >
                                        Continue to Payment →
                                    </button>
                                </form>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    {paymentOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handlePaymentSelect(option.id)}
                                            className={`w-full text-left p-5 border transition-all flex items-center space-x-4 ${paymentMethod === option.id ? 'border-black bg-white shadow-md' : 'border-gray-200 bg-white/50 hover:border-gray-400'}`}
                                        >
                                            <span className="text-2xl">{option.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-serif text-sm tracking-wide">{option.label}</p>
                                                <p className="font-sans text-xs text-gray-400 mt-1">{option.desc}</p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === option.id ? 'border-black' : 'border-gray-300'}`}>
                                                {paymentMethod === option.id && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                                            </div>
                                        </button>
                                    ))}

                                    <div className="flex space-x-4 mt-8">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex-1 border border-gray-300 text-gray-600 py-4 uppercase tracking-[0.2em] hover:bg-gray-50 transition-all text-xs"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={() => paymentMethod && setStep(3)}
                                            disabled={!paymentMethod}
                                            className="flex-1 bg-black text-white py-4 uppercase tracking-[0.2em] hover:bg-gray-800 transition-all disabled:opacity-40 text-xs"
                                        >
                                            Review Order →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6 font-sans">
                                    <div className="bg-white p-6 border border-gray-100">
                                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Shipping To</h3>
                                        <p className="text-sm">{shippingAddress.address}</p>
                                        <p className="text-sm">{shippingAddress.city}, {shippingAddress.postalCode}</p>
                                        <p className="text-sm">{shippingAddress.country}</p>
                                    </div>
                                    <div className="bg-white p-6 border border-gray-100">
                                        <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-3">Payment</h3>
                                        <p className="text-sm">{paymentOptions.find(o => o.id === paymentMethod)?.icon} {paymentOptions.find(o => o.id === paymentMethod)?.label}</p>
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="flex-1 border border-gray-300 text-gray-600 py-4 uppercase tracking-[0.2em] hover:bg-gray-50 transition-all text-xs"
                                        >
                                            ← Back
                                        </button>
                                        <button
                                            onClick={placeOrder}
                                            disabled={loading || cartItems.length === 0}
                                            className="flex-1 bg-black text-white py-4 uppercase tracking-[0.2em] hover:bg-gray-800 transition-all disabled:opacity-50 text-xs"
                                        >
                                            {loading ? 'Processing...' : paymentMethod === 'COD' ? 'Place Order' : `Pay ₹${totalPrice.toLocaleString()}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white p-8 h-fit shadow-sm sticky top-32">
                            <h2 className="text-xl uppercase tracking-widest mb-6 border-b border-gray-200 pb-2">Order Summary</h2>
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center space-x-4">
                                            <span className="font-bold">{item.quantity}x</span>
                                            <div>
                                                <p className="font-serif">{item.title}</p>
                                                <p className="text-gray-500 text-xs uppercase">Size: {item.size}</p>
                                            </div>
                                        </div>
                                        <p>₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm font-sans">
                                <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice.toLocaleString()}`}</span></div>
                                <div className="flex justify-between"><span>Tax (18% GST)</span><span>₹{taxPrice.toLocaleString()}</span></div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t border-black mt-2">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {shippingPrice > 0 && (
                                <p className="text-xs text-gray-400 mt-4 font-sans">Free shipping on orders above ₹5,000</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
