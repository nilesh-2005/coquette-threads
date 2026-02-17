
import { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLayout from '@/components/Admin/AdminLayout';

function Dashboard() {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        pendingOrders: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: orders } = await api.get('/orders');

                const totalSales = orders.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0);
                const totalOrders = orders.length;
                const pendingOrders = orders.filter(o => !o.isDelivered).length;

                setStats({ totalSales, totalOrders, pendingOrders });
                setRecentOrders(orders.slice(0, 5)); // Get first 5 orders
            } catch (error) {
                console.error('Failed to fetch admin stats', error);
            }
        };
        fetchData();
    }, []);

    return (
        <AdminLayout>
            <h1 className="text-3xl tracking-widest uppercase mb-12 text-black font-light">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-8 border border-gray-200 hover:border-black transition-all">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Total Revenue</p>
                    <p className="text-4xl font-serif">₹{stats.totalSales.toLocaleString()}</p>
                </div>
                <div className="bg-white p-8 border border-gray-200 hover:border-black transition-all">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Total Orders</p>
                    <p className="text-4xl font-serif">{stats.totalOrders}</p>
                </div>
                <div className="bg-white p-8 border border-gray-200 hover:border-black transition-all">
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">Pending Actions</p>
                    <p className="text-4xl font-serif">{stats.pendingOrders}</p>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="border border-gray-200">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                    <h2 className="text-sm uppercase tracking-widest">Recent Orders</h2>
                    <button className="text-xs uppercase tracking-widest text-gray-500 hover:text-black hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white text-xs uppercase text-gray-400 tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-6 font-normal">Order ID</th>
                                <th className="px-6 py-6 font-normal">Customer</th>
                                <th className="px-6 py-6 font-normal">Date</th>
                                <th className="px-6 py-6 font-normal">Total</th>
                                <th className="px-6 py-6 font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-6 font-mono text-xs">#{order._id.substring(order._id.length - 6).toUpperCase()}</td>
                                    <td className="px-6 py-6 text-sm">{order.user?.name || 'Guest'}</td>
                                    <td className="px-6 py-6 text-sm text-gray-500 font-mono">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-6 text-sm font-serif">₹{order.totalPrice.toLocaleString()}</td>
                                    <td className="px-6 py-6 text-xs uppercase tracking-wider">
                                        <span className={`px-3 py-1 border ${order.isPaid ? 'border-green-200 text-green-800 bg-green-50' : 'border-yellow-200 text-yellow-800 bg-yellow-50'}`}>
                                            {order.isPaid ? 'Paid' : 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}

export default function ProtectedAdminDashboard() {
    return (
        <ProtectedRoute adminOnly>
            <Dashboard />
        </ProtectedRoute>
    );
}
