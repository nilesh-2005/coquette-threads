import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { useCart } from '@/context/CartContext';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { resolveImageUrl } from '@/lib/utils';

export default function CartDrawer() {
    const { cartItems, isCartOpen, setIsCartOpen, removeFromCart } = useCart();
    const overlayRef = useRef(null);
    const drawerRef = useRef(null);

    // Initial state
    useEffect(() => {
        gsap.set(overlayRef.current, { opacity: 0, display: 'none' });
        gsap.set(drawerRef.current, { xPercent: 100 });
    }, []);

    // Animate open/close
    useEffect(() => {
        if (isCartOpen) {
            gsap.to(overlayRef.current, { display: 'block', opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.to(drawerRef.current, { xPercent: 0, duration: 0.5, ease: 'expo.out' });
        } else {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlayRef.current, { display: 'none' }) });
            gsap.to(drawerRef.current, { xPercent: 100, duration: 0.5, ease: 'expo.in' });
        }
    }, [isCartOpen]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="relative z-[100]">
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col z-[101]"
            >
                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-serif">Shopping Bag ({cartItems.length})</h2>
                    <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                            <p className="mb-4">Your bag is empty.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-sm border-b border-black pb-1 hover:text-gray-800 uppercase tracking-widest"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item, idx) => (
                            <div key={`${item._id}-${item.size}-${idx}`} className="flex gap-4 border-b pb-4 last:border-0">
                                <div className="relative w-20 h-28 bg-gray-100 flex-shrink-0">
                                    <img
                                        src={resolveImageUrl(item.images?.[0]?.url)}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-serif text-sm pr-4">{item.title}</h3>
                                            <button
                                                onClick={() => removeFromCart(item._id, item.size)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-medium">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: item.currency || 'INR' }).format(item.price)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-sm">
                            <span className="font-bold uppercase tracking-widest">Subtotal</span>
                            <span className="font-serif text-lg">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(subtotal)}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-4 text-center uppercase tracking-wider">Shipping & taxes calculated at checkout.</p>
                        <button className="block w-full bg-black text-white text-center py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors shadow-lg">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
