
import { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/Admin/AdminLayout';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeliver = async (id) => {
        if (!confirm('Mark this order as delivered?')) return;
        try {
            await api.put(`/orders/${id}/deliver`, {}); // Call the real endpoint
            setOrders(orders.map(o => o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date() } : o));
        } catch (error) {
            console.error('Failed to update delivery status', error);
            alert('Failed to update delivery status');
        }
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'All') return true;
        if (filter === 'Pending') return !order.isPaid;
        if (filter === 'Processing') return order.isPaid && !order.isDelivered;
        if (filter === 'Delivered') return order.isDelivered;
        return true;
    });

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-4">
                <h1 className="text-xl md:text-3xl tracking-widest uppercase text-black font-light">Order Management</h1>
                <div className="flex space-x-0 border border-gray-200 overflow-x-auto max-w-full">
                    {['All', 'Pending', 'Processing', 'Delivered'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 md:px-6 py-3 text-[10px] md:text-xs uppercase tracking-widest transition-all whitespace-nowrap ${filter === f ? 'bg-black text-white' : 'bg-white text-gray-400 hover:text-black hover:bg-gray-50'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead className="bg-white text-xs uppercase text-gray-400 tracking-widest border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-6 font-normal">Order ID</th>
                            <th className="px-6 py-6 font-normal">Customer</th>
                            <th className="px-6 py-6 font-normal">Date</th>
                            <th className="px-6 py-6 font-normal">Total</th>
                            <th className="px-6 py-6 font-normal">Payment</th>
                            <th className="px-6 py-6 font-normal">Delivery</th>
                            <th className="px-6 py-6 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-serif">Loading orders...</td></tr>
                        ) : filteredOrders.length === 0 ? (
                            <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-serif">No orders found.</td></tr>
                        ) : (
                            filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-6 font-mono text-xs">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td className="px-6 py-6 text-sm">
                                        <div className="font-medium text-gray-900 font-serif">{order.user?.name || 'Guest'}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-400 mt-1">{order.user?.email || order.email}</div>
                                    </td>
                                    <td className="px-6 py-6 text-sm text-gray-500 font-serif">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-6 text-sm font-medium font-serif">₹{order.totalPrice.toLocaleString()}</td>
                                    <td className="px-6 py-6 text-xs uppercase tracking-wider">
                                        <span className={`px-3 py-1 border ${order.isPaid ? 'border-green-200 text-green-800 bg-green-50' : 'border-red-200 text-red-800 bg-red-50'}`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-xs uppercase tracking-wider">
                                        <span className={`px-3 py-1 border ${order.isDelivered ? 'border-green-200 text-green-800 bg-green-50' : 'border-blue-200 text-blue-800 bg-blue-50'}`}>
                                            {order.isDelivered ? 'Delivered' : 'Processing'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-xs uppercase tracking-wider text-right">
                                        {!order.isDelivered && order.isPaid && (
                                            <button
                                                onClick={() => handleDeliver(order._id)}
                                                className="text-black hover:underline font-medium"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

export default function ProtectedAdminOrders() {
    return (
        <ProtectedRoute adminOnly>
            <Orders />
        </ProtectedRoute>
    );
}
