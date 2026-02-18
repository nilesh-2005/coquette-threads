import Head from 'next/head';
import Link from 'next/link';

export default function Cart() {
    // Mock cart items for visual fidelity
    const cartItems = [];

    return (
        <>
            <Head>
                <title>Shopping Cart | Coquette Threads</title>
            </Head>

            <div className="pt-32 pb-16 bg-secondary min-h-screen">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-3xl font-serif mb-8 text-center border-b pb-4">Shopping Bag</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
                            <Link href="/" className="inline-block bg-black text-white px-8 py-3 uppercase text-xs tracking-widest hover:bg-gray-800">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {/* Cart items list would go here */}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
