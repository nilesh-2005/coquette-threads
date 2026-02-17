import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { toggleCart, cartItems } = useCart();
    const { isAdmin } = useAuth();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isHome = router.pathname === '/';
    const textColor = isScrolled ? 'text-black' : (isHome ? 'text-white' : 'text-black');
    const borderColor = isScrolled ? 'border-black' : (isHome ? 'border-white' : 'border-black');

    const headerRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const logoRef = useRef(null);

    // GSAP Scroll Animations
    useGsap(() => {
        const header = headerRef.current;
        const logo = logoRef.current;

        // Initial logo scale in
        gsap.fromTo(logo,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
        );

        // Header Hide/Show on Scroll
        ScrollTrigger.create({
            start: 'top top',
            onUpdate: (self) => {
                // Removed Header Hide/Show on Scroll logic as requested
                // gsap.to(header, { yPercent: -100, duration: 0.3, ease: 'power3.out' });


                // Toggle background style based on scroll position
                if (self.scroll() > 50) {
                    setIsScrolled(true);
                } else {
                    setIsScrolled(false);
                }
            }
        });
    }, []);

    // Mobile Menu Animation
    useGsap(() => {
        if (mobileMenuOpen) {
            // Slide in from left
            gsap.fromTo(mobileMenuRef.current,
                { xPercent: -100 },
                { xPercent: 0, duration: 0.6, ease: 'expo.out' }
            );

            // Stagger links
            gsap.fromTo('.mobile-link',
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
            );
        }
    }, [mobileMenuOpen]);

    // isAdmin is now managed by AuthContext

    return (
        <header
            ref={headerRef}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button className={`md:hidden ${textColor}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>

                {/* Logo */}
                <Link ref={logoRef} href="/" className="flex flex-col items-center group no-underline">
                    <span className={`text-2xl font-serif tracking-[0.2em] uppercase transition-colors duration-500 leading-none ${textColor}`}>
                        Coquette
                    </span>
                    <div className={`w-full h-[0.5px] my-1.5 transition-colors duration-500 ${isScrolled ? 'bg-black/30' : (isHome ? 'bg-white/40' : 'bg-black/30')}`} />
                    <span className={`text-[12px] font-serif tracking-[0.4em] uppercase transition-colors duration-500 leading-none ${textColor}`}>
                        Threads
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className={`hidden md:flex space-x-8 items-center transition-colors duration-500 ${textColor}`}>
                    <Link href="/" className="text-sm tracking-widest hover:text-accent transition-colors">HOME</Link>
                    <Link href="/collection/new-arrivals" className="text-sm tracking-widest hover:text-accent transition-colors">NEW ARRIVALS</Link>
                    <Link href="/collection/ball-gowns" className="text-sm tracking-widest hover:text-accent transition-colors">BALL GOWNS</Link>
                    <Link href="/collection/bridal" className="text-sm tracking-widest hover:text-accent transition-colors">BRIDAL</Link>
                    <Link href="/collection/accessories" className="text-sm tracking-widest hover:text-accent transition-colors">ACCESSORIES</Link>
                    <Link href="/about" className="text-sm tracking-widest hover:text-accent transition-colors">ABOUT</Link>
                    {isAdmin && (
                        <Link href="/admin" className={`text-xs font-bold border ${borderColor} px-3 py-1 hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-widest`}>
                            Admin Panel
                        </Link>
                    )}
                </nav>

                {/* Icons */}
                <div className={`flex space-x-6 items-center transition-colors duration-500 ${textColor}`}>
                    <Link href="/account">
                        <UserIcon className="h-5 w-5 hover:text-accent transition-colors" />
                    </Link>
                    <button className="relative group" onClick={toggleCart}>
                        <ShoppingBagIcon className="h-5 w-5 hover:text-accent transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {cartItems.length}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 z-[90] md:hidden backdrop-blur-sm transition-opacity duration-500"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div ref={mobileMenuRef} className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] z-[100] bg-[#faf9f6] flex flex-col md:hidden overflow-hidden shadow-2xl">
                        {/* Header in Overlay */}
                        <div className="flex justify-between items-center px-6 py-6 border-b border-gray-100">
                            <span className="text-[10px] tracking-widest uppercase text-gray-400 font-sans font-bold">Menu</span>
                            <button className="text-black" onClick={() => setMobileMenuOpen(false)}>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Logo Watermark */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none rotate-90 origin-center translate-x-1/2">
                            <span className="text-[8rem] font-serif uppercase tracking-[0.1em]">Coquette</span>
                        </div>

                        <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col relative z-20">
                            <nav className="space-y-6 mb-12">
                                {[
                                    { name: 'HOME', href: '/' },
                                    { name: 'NEW ARRIVALS', href: '/collection/new-arrivals' },
                                    { name: 'BALL GOWNS', href: '/collection/ball-gowns' },
                                    { name: 'BRIDAL', href: '/collection/bridal' },
                                    { name: 'ACCESSORIES', href: '/collection/accessories' },
                                    { name: 'OUR STORY', href: '/about' },
                                    ...(isAdmin ? [{ name: 'ADMIN PANEL', href: '/admin' }] : [])
                                ].map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mobile-link block group no-underline"
                                    >
                                        <div className="overflow-hidden">
                                            <span className="text-2xl font-serif text-black hover:italic transition-all duration-300 block">
                                                {item.name}
                                            </span>
                                        </div>
                                        <div className="w-0 h-px bg-accent group-hover:w-full transition-all duration-500 mt-1"></div>
                                    </Link>
                                ))}
                            </nav>

                            {/* Additional Links */}
                            <div className="mt-auto border-t border-gray-200 pt-8 space-y-6">
                                <div className="mobile-link">
                                    <span className="text-[10px] tracking-widest uppercase text-accent mb-2 block font-bold">Curated Selection</span>
                                    <Link
                                        href="/collection/bridal"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-xs font-serif italic text-gray-500 hover:text-black transition-colors"
                                    >
                                        Visit the bridal atelier →
                                    </Link>
                                </div>

                                <div className="mobile-link flex flex-wrap gap-4 pt-4 border-t border-gray-100 mt-4">
                                    <span className="text-[9px] tracking-widest uppercase text-gray-400 font-bold hover:text-black transition-colors">IG</span>
                                    <span className="text-[9px] tracking-widest uppercase text-gray-400 font-bold hover:text-black transition-colors">PN</span>
                                    <span className="text-[9px] tracking-widest uppercase text-gray-400 font-bold hover:text-black transition-colors">CT</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
