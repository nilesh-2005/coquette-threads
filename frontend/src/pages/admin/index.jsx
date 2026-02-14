import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

function AdminDashboard() {
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-8 md:px-16 font-serif">
            <Head>
                <title>Admin Dashboard | Coquette Threads</title>
            </Head>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-end border-b border-gray-200 pb-8 mb-12">
                    <div>
                        <h1 className="text-3xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-2">Admin Dashboard</h1>
                        <p className="font-sans text-sm text-gray-500 tracking-wide">Welcome back, Admin</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={logout}
                            className="bg-transparent border border-gray-300 text-gray-800 px-6 py-2 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group border border-gray-100 p-12 text-center hover:border-black transition-all">
                        <h2 className="text-xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-6">Product Management</h2>
                        <p className="font-sans text-sm text-gray-500 tracking-wide mb-8">Add, edit, or remove products from your store.</p>
                        <Link
                            href="/admin/products"
                            className="inline-block bg-black text-white px-8 py-3 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-gray-800 transition-all"
                        >
                            Manage Products
                        </Link>
                    </div>

                    <div className="group border border-gray-100 p-12 text-center hover:border-black transition-all opacity-50">
                        <h2 className="text-xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-6">Order History</h2>
                        <p className="font-sans text-sm text-gray-500 tracking-wide mb-8">View and manage customer orders (Coming Soon).</p>
                        <span className="inline-block border border-gray-300 text-gray-400 px-8 py-3 rounded-full uppercase text-[10px] tracking-[0.2em]">
                            View Orders
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProtectedAdminDashboard() {
    return (
        <ProtectedRoute adminOnly>
            <AdminDashboard />
        </ProtectedRoute>
    );
}
