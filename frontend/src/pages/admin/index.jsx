import { useState } from 'react';
import Head from 'next/head';
import api from '@/lib/api';
import Link from 'next/link';

export default function AdminDashboard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            setIsLoggedIn(true);
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-serif mb-6 text-center">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-3 outline-none focus:border-black"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-3 outline-none focus:border-black"
                        />
                        <button type="submit" className="w-full bg-black text-white py-3 uppercase tracking-widest text-xs">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-6">
            <Head><title>Admin Dashboard</title></Head>
            <div className="container mx-auto">
                <h1 className="text-3xl font-serif mb-8">Dashboard</h1>
                <div className="bg-white p-6 shadow-sm">
                    <p>Welcome, Admin.</p>
                    <div className="mt-6">
                        <Link href="/admin/products" className="text-sm border-b border-black pb-1 hover:text-gray-600">
                            Manage Products
                        </Link>
                    </div>
                    <button className="mt-8 text-red-500 text-sm underline" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
            </div>
        </div>
    );
}
