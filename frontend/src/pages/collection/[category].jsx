import { useState, useEffect, useRef, useMemo } from 'react';
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
    const [sortBy, setSortBy] = useState('newest');
    const [priceFilter, setPriceFilter] = useState('all');
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const headerRef = useRef(null);
    const sortRef = useRef(null);
    const filterRef = useRef(null);

    const sortedProducts = useMemo(() => {
        let items = [...products];

        // Filter
        if (priceFilter === 'under_10k') {
            items = items.filter(p => p.price < 10000);
        } else if (priceFilter === '10k_50k') {
            items = items.filter(p => p.price >= 10000 && p.price <= 50000);
        } else if (priceFilter === 'above_50k') {
            items = items.filter(p => p.price > 50000);
        }

        // Sort
        if (sortBy === 'price_asc') {
            items.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_desc') {
            items.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'newest') {
            items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return items;
    }, [products, sortBy, priceFilter]);

    const gridRef = useStagger('.product-card', {
        to: { opacity: 1, duration: 0.8, ease: 'power2.out' },
        scrollTrigger: {
            start: 'top 85%',
        }
    }, [sortedProducts]);

    // Reset page when category changes
    useEffect(() => {
        setPage(1);
    }, [category]);

    useEffect(() => {
        if (!category) return;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?category=${category}&pageNumber=${page}`);
                setProducts(data.products);
                setPages(data.pages);
            } catch (error) {
                console.error('Failed to fetch collection', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category, page]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowSort(false);
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilter(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useGsap(() => {
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
            );
        }
    }, [category]);

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

                    {/* Toolbar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12 py-4 border-y border-gray-100">
                        <div className="text-xs uppercase tracking-widest text-gray-400 mb-4 md:mb-0 font-sans">
                            {products.length > 0 ? `${(page - 1) * 12 + 1}-${Math.min(page * 12, (page - 1) * 12 + products.length)} of many` : '0'} Products
                        </div>
                        <div className="flex space-x-8 text-xs uppercase tracking-widest text-gray-500 font-sans relative">
                            {/* Filter Dropdown */}
                            <div className="relative" ref={filterRef}>
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="hover:text-accent transition-colors uppercase tracking-widest flex items-center"
                                >
                                    Filter <span className="ml-2 pr-2 border-r border-gray-200">{showFilter ? '−' : '+'}</span>
                                </button>

                                {showFilter && (
                                    <div className="absolute top-full left-0 mt-4 w-56 bg-white shadow-xl border border-gray-100 z-50 p-6 space-y-4 font-sans">
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-black border-b border-gray-100 pb-2 mb-2 uppercase">Price Range</p>
                                        {[
                                            { id: 'all', label: 'All Items' },
                                            { id: 'under_10k', label: 'Under ₹10,000' },
                                            { id: '10k_50k', label: '₹10,000 - ₹50,000' },
                                            { id: 'above_50k', label: 'Above ₹50,000' }
                                        ].map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setPriceFilter(option.id);
                                                    setShowFilter(false);
                                                }}
                                                className={`block w-full text-left text-[10px] tracking-[0.2em] uppercase transition-colors ${priceFilter === option.id ? 'text-accent font-bold' : 'text-gray-500 hover:text-black'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="relative" ref={sortRef}>
                                <button
                                    onClick={() => setShowSort(!showSort)}
                                    className="hover:text-accent transition-colors uppercase tracking-widest flex items-center"
                                >
                                    Sort By <span className="ml-2">{showSort ? '↑' : '↓'}</span>
                                </button>

                                {showSort && (
                                    <div className="absolute top-full right-0 mt-4 w-56 bg-white shadow-xl border border-gray-100 z-50 p-6 space-y-4 font-sans">
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-black border-b border-gray-100 pb-2 mb-2 uppercase">Sort Order</p>
                                        {[
                                            { id: 'newest', label: 'Newest First' },
                                            { id: 'price_asc', label: 'Price: Low to High' },
                                            { id: 'price_desc', label: 'Price: High to Low' }
                                        ].map(option => (
                                            <button
                                                key={option.id}
                                                onClick={() => {
                                                    setSortBy(option.id);
                                                    setShowSort(false);
                                                }}
                                                className={`block w-full text-left text-[10px] tracking-[0.2em] uppercase transition-colors ${sortBy === option.id ? 'text-accent font-bold' : 'text-gray-500 hover:text-black'
                                                    }`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin h-10 w-10 border-b-2 border-accent rounded-full"></div>
                        </div>
                    ) : (
                        <>
                            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 mb-16">
                                {sortedProducts.length > 0 ? (
                                    sortedProducts.map(p => <ProductCard key={p._id} product={p} />)
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

                            {/* Pagination Controls */}
                            {pages > 1 && (
                                <div className="flex justify-center items-center space-x-6 border-t border-gray-100 pt-12">
                                    <button
                                        onClick={() => {
                                            setPage(p => Math.max(1, p - 1));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        disabled={page === 1}
                                        className={`px-6 py-3 text-xs uppercase tracking-widest border border-gray-200 transition-all ${page === 1 ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-black hover:border-black hover:bg-white'}`}
                                    >
                                        Previous
                                    </button>
                                    <span className="text-xs font-serif text-gray-500">Page {page} of {pages}</span>
                                    <button
                                        onClick={() => {
                                            setPage(p => Math.min(pages, p + 1));
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        disabled={page === pages}
                                        className={`px-6 py-3 text-xs uppercase tracking-widest border border-gray-200 transition-all ${page === pages ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-black hover:border-black hover:bg-white'}`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
