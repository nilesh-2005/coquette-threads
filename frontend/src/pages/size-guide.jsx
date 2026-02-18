import Head from 'next/head';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export default function SizeGuide() {
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
                <title>Size Guide | Coquette Threads</title>
                <meta name="description" content="Size guide for Coquette Threads apparel." />
            </Head>

            <main className="bg-[#faf9f6] min-h-screen pt-32 pb-24">
                <div ref={containerRef} className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-serif mb-12 text-center text-gray-900">Size Guide</h1>

                    <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto font-sans">
                        Our collections are designed to fit true to size. Use the chart below to determine the best size for you.
                        If you are between sizes, we recommend sizing up for a more comfortable fit.
                    </p>

                    <div className="overflow-x-auto mb-16">
                        <table className="w-full text-left border-collapse font-sans text-sm md:text-base">
                            <thead>
                                <tr className="bg-primary text-white">
                                    <th className="p-4 border border-gray-800">Size</th>
                                    <th className="p-4 border border-gray-800">Bust (in)</th>
                                    <th className="p-4 border border-gray-800">Waist (in)</th>
                                    <th className="p-4 border border-gray-800">Hips (in)</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-700">
                                <tr className="even:bg-gray-100">
                                    <td className="p-4 border border-gray-300 font-bold">XS</td>
                                    <td className="p-4 border border-gray-300">31-32</td>
                                    <td className="p-4 border border-gray-300">24-25</td>
                                    <td className="p-4 border border-gray-300">33-34</td>
                                </tr>
                                <tr className="even:bg-gray-100">
                                    <td className="p-4 border border-gray-300 font-bold">S</td>
                                    <td className="p-4 border border-gray-300">33-34</td>
                                    <td className="p-4 border border-gray-300">26-27</td>
                                    <td className="p-4 border border-gray-300">35-36</td>
                                </tr>
                                <tr className="even:bg-gray-100">
                                    <td className="p-4 border border-gray-300 font-bold">M</td>
                                    <td className="p-4 border border-gray-300">35-36</td>
                                    <td className="p-4 border border-gray-300">28-29</td>
                                    <td className="p-4 border border-gray-300">37-38</td>
                                </tr>
                                <tr className="even:bg-gray-100">
                                    <td className="p-4 border border-gray-300 font-bold">L</td>
                                    <td className="p-4 border border-gray-300">37-39</td>
                                    <td className="p-4 border border-gray-300">30-32</td>
                                    <td className="p-4 border border-gray-300">39-41</td>
                                </tr>
                                <tr className="even:bg-gray-100">
                                    <td className="p-4 border border-gray-300 font-bold">XL</td>
                                    <td className="p-4 border border-gray-300">40-42</td>
                                    <td className="p-4 border border-gray-300">33-35</td>
                                    <td className="p-4 border border-gray-300">42-44</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <section className="bg-white p-8 border border-gray-200 shadow-sm">
                        <h3 className="text-xl font-serif mb-4 text-gray-900">Measuring Tips</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 font-sans">
                            <li><strong>Bust:</strong> Measure around the fullest part of your bust.</li>
                            <li><strong>Waist:</strong> Measure around your natural waistline, usually the narrowest part.</li>
                            <li><strong>Hips:</strong> Measure around the fullest part of your hips.</li>
                        </ul>
                    </section>
                </div>
            </main>
        </>
    );
}
