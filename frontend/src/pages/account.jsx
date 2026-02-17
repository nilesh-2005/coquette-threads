import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useGsap } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';

export default function Account() {
    const { user, login, logout, loading } = useAuth();
    const router = useRouter();
    const accountHeaderRef = useRef(null);
    const authHeaderRef = useRef(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    // Login State
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Register State
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError('');

        try {
            const { data } = await api.post('/auth/login', loginData);
            login(data);

            if (data.isAdmin || data.role === 'admin') {
                router.push('/admin');
            }
        } catch (error) {
            setLoginError(error.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError('');

        if (registerData.password !== registerData.confirmPassword) {
            setRegisterError('Passwords do not match');
            setIsRegisterLoading(false);
            return;
        }

        try {
            const { data } = await api.post('/auth/register', {
                name: `${registerData.firstName} ${registerData.lastName}`,
                email: registerData.email,
                password: registerData.password
            });

            login(data);
        } catch (error) {
            setRegisterError(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsRegisterLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    useGsap(() => {
        if (user && accountHeaderRef.current) {
            gsap.fromTo(accountHeaderRef.current.children,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
            );
        }
    }, [user, loading]);

    useGsap(() => {
        if (!user && authHeaderRef.current) {
            gsap.fromTo('.auth-header',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
            );
        }
    }, [user, loading]);

    if (loading) {
        return <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-0 font-serif flex justify-center"><div className="text-sm tracking-widest uppercase">Loading...</div></div>;
    }

    if (user) {
        return (
            <div className="min-h-screen bg-white pt-32 pb-20 px-8 md:px-16 font-serif">
                <Head>
                    <title>My Account | Coquette Threads</title>
                </Head>

                <div className="max-w-4xl mx-auto">
                    <div ref={accountHeaderRef} className="flex justify-between items-end border-b border-gray-200 pb-8 mb-12">
                        <div>
                            <h1 className="text-3xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-2">My Account</h1>
                            <p className="font-sans text-sm text-gray-500 tracking-wide">Welcome back, {user.name}</p>
                        </div>
                        <div className="flex space-x-4">
                            {(user.isAdmin || user.role === 'admin') && (
                                <button
                                    onClick={() => router.push('/admin')}
                                    className="bg-black text-white border border-black px-6 py-2 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-gray-800 transition-all"
                                >
                                    Admin Dashboard
                                </button>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-transparent border border-gray-300 text-gray-800 px-6 py-2 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-all"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="md:col-span-2">
                            <h2 className="text-xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-6">Order History</h2>
                            <div className="bg-gray-50 p-12 text-center">
                                <p className="font-sans text-sm text-gray-500 tracking-wide">You haven&apos;t placed any orders yet.</p>
                                <button className="mt-6 bg-black text-white px-8 py-3 rounded-full uppercase text-[10px] tracking-[0.2em] hover:bg-gray-800 transition-all">
                                    Start Shopping
                                </button>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl tracking-widest uppercase text-[#1a1a1a] font-normal mb-6">Account Details</h2>
                            <div className="font-sans text-sm text-gray-600 leading-relaxed tracking-wide">
                                <p className="font-medium text-black mb-1">{user.name}</p>
                                <p className="mb-4">{user.email}</p>
                                <p className="text-gray-400 italic">No address saved</p>
                                <button className="mt-4 text-[10px] uppercase tracking-[0.2em] underline decoration-gray-300 hover:text-black hover:decoration-black transition-all">
                                    View Addresses (0)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-12 px-4 md:px-8 font-serif">
            <Head>
                <title>Account | Coquette Threads</title>
            </Head>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 relative border-t border-gray-100 mt-8">
                <div className="hidden md:block absolute top-12 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2"></div>

                <div className="flex flex-col px-4 md:px-16 pt-8">
                    <h2 className="auth-header text-3xl text-center mb-16 tracking-widest text-[#1a1a1a] uppercase font-normal">Sign In</h2>
                    <form onSubmit={handleLogin} className="space-y-10 w-full max-w-sm mx-auto font-sans">
                        {loginError && (
                            <div className="bg-red-50 text-red-500 p-3 text-xs text-center tracking-wide">{loginError}</div>
                        )}
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="pt-8 text-center flex flex-col items-center">
                            <button
                                type="submit"
                                disabled={isLoginLoading}
                                className="bg-black text-white px-12 py-3 rounded-full uppercase text-[10px] tracking-[0.2em] font-medium hover:bg-gray-900 transition-all disabled:opacity-50 min-w-[160px]"
                            >
                                {isLoginLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                            <a href="#" className="mt-8 text-[10px] text-gray-500 hover:text-black border-b border-gray-300 pb-0.5 transition-colors tracking-wide">
                                Forgot your password?
                            </a>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col px-4 md:px-16 pt-16 md:pt-8">
                    <h2 className="auth-header text-3xl text-center mb-16 tracking-widest text-[#1a1a1a] uppercase font-normal">Sign Up</h2>
                    <form onSubmit={handleRegister} className="space-y-10 w-full max-w-sm mx-auto font-sans">
                        {registerError && (
                            <div className="bg-red-50 text-red-500 p-3 text-xs text-center tracking-wide">{registerError}</div>
                        )}
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={registerData.firstName}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={registerData.lastName}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="group space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 block">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors text-sm text-gray-800 placeholder-gray-300 rounded-none bg-transparent"
                                required
                            />
                        </div>
                        <div className="pt-8 text-center">
                            <button
                                type="submit"
                                disabled={isRegisterLoading}
                                className="bg-transparent text-black border border-black px-12 py-3 rounded-full uppercase text-[10px] tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-all disabled:opacity-50 min-w-[160px]"
                            >
                                {isRegisterLoading ? 'Creating...' : 'Create Account'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
