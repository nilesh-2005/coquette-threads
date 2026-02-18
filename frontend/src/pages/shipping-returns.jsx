import Head from 'next/head';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export default function ShippingReturns() {
    const containerRef = useRef(null);

    useGsap(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, []);

    return (
        <>
            <Head>
                <title>Shipping & Returns | Coquette Threads</title>
                <meta name="description" content="Shipping information and return policy for Coquette Threads." />
            </Head>

            <main className="bg-[#faf9f6] min-h-screen pt-32 pb-24">
                <div ref={containerRef} className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center text-gray-900">Shipping & Returns</h1>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif mb-6 text-gray-800 border-b border-gray-200 pb-2">Shipping Policy</h2>
                        <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
                            <p>
                                At Coquette Threads, we treat every order with the utmost care. Our garments are often sensitive and require special handling.
                            </p>
                            <p>
                                <strong>Processing Time:</strong> Please allow 1-3 business days for order processing. Custom or made-to-order items may take longer, as noted on the product page.
                            </p>
                            <p>
                                <strong>Domestic Shipping:</strong> We offer standard (5-7 business days) and express (2-3 business days) shipping options within the country.
                            </p>
                            <p>
                                <strong>International Shipping:</strong> We currently ship to select international destinations. Delivery times vary by location, typically ranging from 7-14 business days.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-serif mb-6 text-gray-800 border-b border-gray-200 pb-2">Return Policy</h2>
                        <div className="space-y-4 text-gray-600 font-sans leading-relaxed">
                            <p>
                                We want you to be completely in love with your purchase. If for any reason you are not, we accept returns within 14 days of delivery.
                            </p>
                            <p>
                                <strong>Conditions:</strong> Items must be unworn, unwashed, and in their original condition with all tags attached. Bridal gowns and custom items are final sale.
                            </p>
                            <p>
                                <strong>Process:</strong> To initiate a return, please contact our support team at support@coquettethreads.com with your order number.
                            </p>
                            <p>
                                <strong>Refunds:</strong> Once we receive and inspect your return, we will process your refund to the original payment method within 5-7 business days.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif mb-6 text-gray-800 border-b border-gray-200 pb-2">Contact Us</h2>
                        <p className="text-gray-600 font-sans leading-relaxed">
                            If you have any questions about your order or our policies, please define don't hesitate to reach out to our customer service team.
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}
