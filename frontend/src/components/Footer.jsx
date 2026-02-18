import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/newsletter/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setMessage(data.message || 'Subscribed successfully!');
                setEmail('');
            } else {
                setStatus('error');
                setMessage(data.message || 'Subscription failed.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <footer className="bg-primary text-secondary py-12 md:py-16">
            <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12">
                <div>
                    <h4 className="text-xl font-serif mb-6">Coquette Threads</h4>
                    <p className="text-sm text-gray-400 font-sans leading-relaxed">
                        Timeless elegance for the modern romantic. Handcrafted with European sensibilities.
                    </p>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Shop</h5>
                    <ul className="space-y-3 text-sm text-gray-400 font-sans">
                        <li><Link href="/collection/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                        <li><Link href="/collection/ball-gowns" className="hover:text-white transition-colors">Ball Gowns</Link></li>
                        <li><Link href="/collection/bridal" className="hover:text-white transition-colors">Bridal</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors font-bold text-accent">Our Story (About)</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Help</h5>
                    <ul className="space-y-3 text-sm text-gray-400">
                        <li><Link href="/shipping-returns" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-sm uppercase tracking-widest mb-6 font-bold">Newsletter</h5>
                    <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive updates.</p>
                    <form onSubmit={handleSubscribe} className="flex flex-col">
                        <div className="flex border-b border-gray-600 pb-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-transparent w-full outline-none text-white text-sm placeholder-gray-500"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="text-xs uppercase tracking-widest text-gray-400 hover:text-white disabled:opacity-50"
                            >
                                {status === 'loading' ? '...' : 'Join'}
                            </button>
                        </div>
                        {message && (
                            <p className={`text-xs mt-2 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-600">
                &copy; {new Date().getFullYear()} Coquette Threads. All rights reserved.
            </div>
        </footer>
    );
}
