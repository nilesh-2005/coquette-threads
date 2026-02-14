import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import api from '@/lib/api';

export default function ProductPage() {
    const router = useRouter();
    const { slug } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');

    useEffect(() => {
        if (!slug) return;
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/slug/${slug}`);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

    return (
        <>
            <Head>
                <title>{product.title} | Coquette Threads</title>
            </Head>

            <div className="bg-secondary min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-[3/4] bg-white overflow-hidden">
                                <Image
                                    src={product.images[0]?.url || '/assets/placeholder.jpg'}
                                    alt={product.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.slice(1).map((img, idx) => (
                                    <div key={idx} className="relative aspect-square cursor-pointer border border-transparent hover:border-black">
                                        <Image src={img.url} alt="thumbnail" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex flex-col justify-center">
                            <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.title}</h1>
                            <p className="text-2xl font-serif text-gray-800 mb-8">
                                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: product.currency }).format(product.price)}
                            </p>

                            <div className="prose prose-sm mb-8" dangerouslySetInnerHTML={{ __html: product.description }} />

                            {/* Specs */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-8 border-t border-b border-gray-200 py-6">
                                <div><span className="font-bold">Fabric:</span> {product.fabric}</div>
                                <div><span className="font-bold">Silhouette:</span> {product.silhouette}</div>
                                <div><span className="font-bold">Neckline:</span> {product.neckline}</div>
                                <div><span className="font-bold">Production:</span> {product.productionLeadTime}</div>
                            </div>

                            {/* Sizes */}
                            <div className="mb-8">
                                <h4 className="text-sm uppercase tracking-widest mb-3 font-bold">Size</h4>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center border transition-all ${selectedSize === size
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-transparent text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button className="w-full bg-black text-white uppercase tracking-widest py-4 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                                Add to Cart
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">Free shipping on all orders over ₹20,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
