import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import HeroEditorial from '@/components/HeroEditorial';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';
import { useGsap, useStagger } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const gridRef = useStagger('.product-card', {
        to: { opacity: 1, duration: 0.8, ease: 'power2.out' }, // Explicitly ensure opacity goes to 1
        scrollTrigger: {
            start: 'top 85%', // Start earlier
        }
    }, [products]);

    useGsap(() => {
        gsap.fromTo('.home-header > *',
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.home-header',
                    start: 'top 90%'
                }
            }
        );
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Head>
                <title>Coquette Threads | Romance, Tailored</title>
                <meta name="description" content="European inspired gowns with refined elegance." />
            </Head>

            <HeroEditorial />

            <section className="py-24 bg-secondary">
                <div className="container mx-auto px-6">
                    <div className="home-header text-center mb-16">
                        <h3 className="text-sm tracking-widest uppercase mb-4 text-gray-500">Curated Collection</h3>
                        <h2 className="text-4xl font-serif">The Atelier</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
