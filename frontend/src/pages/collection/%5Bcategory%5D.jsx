import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function Collection() {
    const router = useRouter();
    const { category } = router.query;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const formatTitle = (slug) => slug ? slug.replace(/-/g, ' ').toUpperCase() : '';

    return (
        <>
            <Head>
                <title>{formatTitle(category)} | Coquette Threads</title>
            </Head>

            <div className="pt-32 pb-16 bg-secondary min-h-screen">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl font-serif mb-12 text-center">{formatTitle(category)}</h1>

                    {loading ? (
                        <div className="flex justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-black rounded-full"></div></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {products.length > 0 ? (
                                products.map(p => <ProductCard key={p._id} product={p} />)
                            ) : (
                                <p className="col-span-full text-center text-gray-500">No items found in this collection.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
