import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { resolveImageUrl } from '@/lib/utils';
import api from '@/lib/api';
import { gsap } from '@/lib/gsap';
import { useGsap, useStagger } from '@/hooks/useGsap';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
    const router = useRouter();
    const { slug } = router.query;
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(null);

    const mainImageRef = useRef(null);
    const detailsRef = useRef(null);

    // Fetch Product Data
    useEffect(() => {
        if (!slug) return;
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/products/slug/${slug}`);
                setProduct(data);
                if (data.images?.length > 0) setActiveImage(data.images[0]);
                if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);

                // Fetch Related Products (Simple: fetch all and take 4 excluding current)
                const { data: allData } = await api.get('/products');
                const related = allData.products
                    .filter(p => p._id !== data._id)
                    .slice(0, 4);
                setRelatedProducts(related);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [slug]);

    // Initialize active image
    useEffect(() => {
        if (product && product.images?.length > 0) {
            setActiveImage(product.images[0]);
        }
    }, [product]);

    // Animate image change
    useGsap(() => {
        if (activeImage && mainImageRef.current) {
            gsap.fromTo(mainImageRef.current,
                { opacity: 0, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
            );
        }
    }, [activeImage]);

    // Animate details reveal
    useGsap(() => {
        if (detailsRef.current) {
            gsap.fromTo(
                detailsRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.3,
                }
            );
        }
    }, [product]);

    // Related Products Animation
    const relatedRef = useStagger('.product-card', {
        scrollTrigger: {
            start: 'top 85%',
        }
    }, [relatedProducts]);

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
    if (!product) return <div className="h-screen flex items-center justify-center">Product not found</div>;

    return (
        <>
            <Head>
                <title>{product.title} | Coquette Threads</title>
            </Head>

            <div className="bg-secondary min-h-screen pt-24 pb-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-16 mb-24 items-start">
                        {/* Gallery */}
                        <div className="space-y-4 lg:sticky lg:top-32">
                            <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-sm max-h-[80vh]">
                                {activeImage && (
                                    <img
                                        ref={mainImageRef}
                                        src={resolveImageUrl(activeImage.url)}
                                        alt={product.title}
                                        className="absolute inset-0 w-full h-full object-contain"
                                    />
                                )}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={`relative aspect-square cursor-pointer border transition-all ${activeImage?._id === img._id ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                                    >
                                        <img src={resolveImageUrl(img.url)} alt="thumbnail" className="absolute inset-0 w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Details */}
                        <div ref={detailsRef} className="flex flex-col justify-center">
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
                            <button
                                onClick={() => selectedSize ? addToCart(product, selectedSize) : alert('Please select a size')}
                                className="w-full bg-black text-white uppercase tracking-widest py-4 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95 duration-200"
                            >
                                Add to Cart
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">Free shipping on all orders over ₹5,000</p>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div className="border-t border-gray-200 pt-16">
                        <h3 className="text-2xl font-serif mb-8 text-center">You May Also Like</h3>
                        <div ref={relatedRef} className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide">
                            {relatedProducts.length > 0 ? (
                                relatedProducts.map((p) => (
                                    <div key={p._id} className="min-w-[280px] snap-center">
                                        <ProductCard product={p} />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center w-full text-gray-400">No other gowns found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
