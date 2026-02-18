import Head from 'next/head';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useRef, useState } from 'react';

export default function Contact() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState('');

    useGsap(() => {
        if (containerRef.current) {
            gsap.fromTo(containerRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
            );
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for actual form submission
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
        }, 1500);
    };

    return (
        <>
            <Head>
                <title>Contact Us | Coquette Threads</title>
                <meta name="description" content="Contact Coquette Threads for inquiries and support." />
            </Head>

            <main className="bg-[#faf9f6] min-h-screen pt-32 pb-24">
                <div ref={containerRef} className="container mx-auto px-6 max-w-5xl">
                    <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center text-gray-900">Contact Us</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-serif mb-4 text-gray-900">Get in Touch</h3>
                                <p className="text-gray-600 font-sans leading-relaxed mb-6">
                                    We'd love to hear from you. Whether you have a question about our collections, pricing, or just want to say hello, our team is ready to answer all your questions.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-2">Email</h4>
                                <a href="mailto:friendisrude@gmail.com" className="text-gray-800 hover:text-accent transition-colors font-serif text-lg">
                                    friendisrude@gmail.com
                                </a>
                            </div>

                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-2">Address</h4>
                                <p className="text-gray-600 font-serif text-lg">
                                    Anand ICE, kanota<br />
                                    Jaipur, RJ 303012
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-2">Hours</h4>
                                <p className="text-gray-600 font-sans">
                                    Monday - Friday: 9am - 6pm IST<br />
                                    Saturday: 10am - 4pm IST
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 shadow-sm border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-accent transition-colors bg-transparent"
                                        placeholder="Batman"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-accent transition-colors bg-transparent"
                                        placeholder="batman@gmail.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm uppercase tracking-wider text-gray-500 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows="4"
                                        className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-accent transition-colors bg-transparent resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || status === 'success'}
                                    className="w-full bg-primary text-secondary py-4 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
                                </button>

                                {status === 'success' && (
                                    <p className="text-green-600 text-sm text-center mt-4">
                                        Thank you! We have received your message and will get back to you shortly.
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
