import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '@/lib/api';

export default function Account() {
    const router = useRouter();
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
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Redirect based on role
            if (data.isAdmin) {
                router.push('/admin');
            } else {
                router.push('/');
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

            // Auto login after register
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            router.push('/');
        } catch (error) {
            setRegisterError(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsRegisterLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9] pt-24 pb-12 px-4 md:px-8">
            <Head>
                <title>Account | Coquette Threads</title>
            </Head>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {/* SIGN IN COLUMN */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-serif text-center mb-12 tracking-wide text-primary">SIGN IN</h2>

                    <form onSubmit={handleLogin} className="space-y-8 max-w-sm mx-auto w-full">
                        {loginError && (
                            <div className="bg-red-50 text-red-500 p-3 text-sm text-center">{loginError}</div>
                        )}

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                disabled={isLoginLoading}
                                className="bg-black text-white px-12 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
                            >
                                {isLoginLoading ? 'Signing In...' : 'Sign In'}
                            </button>

                            <div className="mt-6">
                                <a href="#" className="text-sm text-gray-500 underline decoration-gray-300 hover:text-black">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>

                {/* SIGN UP COLUMN */}
                <div className="flex flex-col">
                    <h2 className="text-3xl font-serif text-center mb-12 tracking-wide text-primary">SIGN UP</h2>

                    <form onSubmit={handleRegister} className="space-y-8 max-w-sm mx-auto w-full">
                        {registerError && (
                            <div className="bg-red-50 text-red-500 p-3 text-sm text-center">{registerError}</div>
                        )}

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={registerData.firstName}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={registerData.lastName}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@email.com"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-sans text-gray-500">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="••••••••"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                                className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-black transition-colors font-sans"
                                required
                            />
                        </div>

                        <div className="flex items-start pt-2">
                            <input
                                type="checkbox"
                                id="promo"
                                className="mt-1 mr-3 h-4 w-4 border-gray-300 rounded text-black focus:ring-transparent checked:bg-black checked:border-black"
                            />
                            <label htmlFor="promo" className="text-[10px] uppercase tracking-wider text-gray-500 leading-tight cursor-pointer">
                                Keep me up to date with special offers and promotion
                            </label>
                        </div>

                        <div className="pt-4 text-center">
                            <button
                                type="submit"
                                disabled={isRegisterLoading}
                                className="bg-black text-white px-12 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-gray-800 transition-all disabled:opacity-50"
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
