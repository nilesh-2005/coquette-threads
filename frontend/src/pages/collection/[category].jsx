import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { useGsap, useStagger } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';

export default function Collection() {
    const router = useRouter();
    const { category } = router.query;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const headerRef = useRef(null);

    const gridRef = useStagger('.product-card', {
        to: { opacity: 1, duration: 0.8, ease: 'power2.out' },
        scrollTrigger: {
            start: 'top 85%',
        }
    }, [products]);

    useEffect(() => {
        if (!category) return;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Map slug to category name or ID if needed, for now fetching all or filtered by keyword/category
                // Assuming backend supports filtering by category slug or name
                const { data } = await api.get(`/products?category=${category}`);
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch collection', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    useGsap(() => {
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
            );
        }
    }, [category]); // Re-run when category changes

    const formatTitle = (slug) => slug ? slug.replace(/-/g, ' ').toUpperCase() : '';

    return (
        <>
            <Head>
                <title>{formatTitle(category)} | Coquette Threads</title>
            </Head>

            <div className="pt-32 pb-16 bg-[#faf9f6] min-h-screen">
                <div className="container mx-auto px-6">
                    <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-accent mb-4 block">Collection</span>
                        <h1 className="text-5xl md:text-6xl font-serif mb-6 tracking-tight text-gray-900">{formatTitle(category)}</h1>
                        <div className="w-24 h-px bg-accent/30 mx-auto mb-6"></div>
                        <p className="text-gray-500 font-serif italic text-lg leading-relaxed max-w-2xl mx-auto">
                            Discover our curated selection of exquisite {formatTitle(category).toLowerCase()} designed to evoke timeless elegance and historical grandeur.
                        </p>
                    </div>

                    {/* Toolbar Placeholder */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 py-4 border-y border-gray-100">
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-4 md:mb-0">
                            {products.length} Products Found
                        </div>
                        <div className="flex space-x-8 text-xs uppercase tracking-widest text-gray-500 cursor-pointer">
                            <span className="hover:text-accent transition-colors flex items-center">
                                Filter <span className="ml-2 pr-2 border-r border-gray-200">+</span>
                            </span>
                            <span className="hover:text-accent transition-colors">
                                Sort By <span className="ml-2">↓</span>
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin h-10 w-10 border-b-2 border-accent rounded-full"></div>
                        </div>
                    ) : (
                        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                            {products.length > 0 ? (
                                products.map(p => <ProductCard key={p._id} product={p} />)
                            ) : (
                                <div className="col-span-full text-center py-20 bg-white/50 rounded-lg">
                                    <p className="text-gray-400 font-serif italic text-xl">No items found in this collection.</p>
                                    <button
                                        onClick={() => router.push('/')}
                                        className="mt-6 text-xs tracking-widest uppercase border-b border-black pb-1 hover:text-accent hover:border-accent transition-all"
                                    >
                                        Return Home
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
