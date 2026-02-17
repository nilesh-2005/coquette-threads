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
            gsap.fromTo(mobileMenuRef.current,
                { opacity: 0, scaleY: 0.95, transformOrigin: 'top center' },
                { opacity: 1, scaleY: 1, duration: 0.4, ease: 'expo.out' }
            );

            // Stagger links
            gsap.fromTo('.mobile-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: 'power2.out' }
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
                <div ref={mobileMenuRef} className="absolute top-full left-0 w-full bg-white border-t p-6 md:hidden flex flex-col space-y-4 shadow-md h-screen">
                    <Link className="mobile-link text-lg font-serif" href="/collection/new-arrivals" onClick={() => setMobileMenuOpen(false)}>NEW ARRIVALS</Link>
                    <Link className="mobile-link text-lg font-serif" href="/collection/ball-gowns" onClick={() => setMobileMenuOpen(false)}>BALL GOWNS</Link>
                    <Link className="mobile-link text-lg font-serif" href="/collection/bridal" onClick={() => setMobileMenuOpen(false)}>BRIDAL</Link>
                    <Link className="mobile-link text-lg font-serif" href="/about" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
                </div>
            )}
        </header>
    );
}
