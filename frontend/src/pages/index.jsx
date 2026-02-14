import { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroEditorial from '@/components/HeroEditorial';
import ProductCard from '@/components/ProductCard';
import api from '@/lib/api';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    <div className="text-center mb-16">
                        <h3 className="text-sm tracking-widest uppercase mb-4 text-gray-500">Curated Collection</h3>
                        <h2 className="text-4xl font-serif">The Atelier</h2>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
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
