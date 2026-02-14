import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import Head from 'next/head';
import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import AdminRoute from '@/components/Admin/AdminRoute';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products?pageNumber=1&keyword=');
                console.log('Frontend fetched products:', data.products);
                setProducts(data.products || []);
            } catch (error) {
                console.error('Frontend fetch error:', error);
            }
        };
        fetchProducts();
    }, []);

    const scope = useGsap(() => {
        if (products.length > 0) {
            console.log('Running GSAP animation for products');
            gsap.fromTo(
                '.admin-row',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
            );
        }
    }, [products]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    return (
        <AdminRoute>
            <div className="min-h-screen bg-gray-50 pt-24 px-6">
                <Head><title>Admin Products</title></Head>
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-serif">Products</h1>
                        <Link href="/admin/products/new" className="bg-black text-white px-6 py-2 uppercase tracking-widest text-xs">
                            Create New
                        </Link>
                    </div>

                    <div ref={scope} className="bg-white shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product._id} className="admin-row">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id.substring(20, 24)}...</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium spac-x-4">
                                            <Link href={`/admin/products/${product._id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                            <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminRoute>
    );
}
