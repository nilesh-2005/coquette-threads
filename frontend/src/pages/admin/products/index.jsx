
import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Head from 'next/head';
import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/Admin/AdminLayout';

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/products?pageNumber=${page}&keyword=`);
                setProducts(data.products || []);
                setPages(data.pages);
            } catch (error) {
                console.error('Frontend fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page]);

    const scope = useGsap(() => {
        if (products.length > 0) {
            gsap.fromTo(
                '.admin-row',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [products]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert(`Failed to delete product. Server responded: ${error.response?.data?.message || error.message}`);
            }
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl tracking-widest uppercase text-black font-light">Products</h1>
                    <Link href="/admin/products/new" className="bg-black text-white px-8 py-3 uppercase tracking-[0.2em] text-xs hover:bg-gray-800 transition-all border border-black">
                        Create New
                    </Link>
                </div>

                <div ref={scope} className="bg-white border border-gray-200 overflow-x-auto mb-8">
                    <table className="w-full text-left">
                        <thead className="bg-white text-xs uppercase text-gray-400 tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-6 font-normal w-24 text-center">Image</th>
                                <th className="px-6 py-6 font-normal w-64">Name</th>
                                <th className="px-6 py-6 font-normal w-32">Price</th>
                                <th className="px-6 py-6 font-normal text-right w-40">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-serif">Loading products...</td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500 font-serif">No products found.</td></tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product._id} className="admin-row hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-center">
                                            <div className="w-12 h-16 bg-gray-50 border border-gray-100 overflow-hidden mx-auto">
                                                {product.images?.[0]?.url ? (
                                                    <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] uppercase">No Img</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 font-serif">{product.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-serif">₹{product.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs uppercase tracking-wider space-x-6 text-right">
                                            <Link href={`/admin/products/${product._id}`} className="text-black hover:underline">Edit</Link>
                                            <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-600">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {pages > 1 && (
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className={`px-4 py-2 text-xs uppercase tracking-widest border border-gray-200 transition-all ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:border-black'}`}
                        >
                            Previous
                        </button>
                        <span className="text-xs font-serif text-gray-500">Page {page} of {pages}</span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === pages}
                            className={`px-4 py-2 text-xs uppercase tracking-widest border border-gray-200 transition-all ${page === pages ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:border-black'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default function ProtectedAdminProducts() {
    return (
        <ProtectedRoute adminOnly>
            <AdminProducts />
        </ProtectedRoute>
    );
}
