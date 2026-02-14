import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>

                {/* Logo */}
                <Link href="/" className="text-2xl font-serif tracking-widest uppercase">
                    Coquette
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    <Link href="/collection/new-arrivals" className="text-sm tracking-widest hover:text-accent transition-colors">NEW ARRIVALS</Link>
                    <Link href="/collection/ball-gowns" className="text-sm tracking-widest hover:text-accent transition-colors">BALL GOWNS</Link>
                    <Link href="/collection/bridal" className="text-sm tracking-widest hover:text-accent transition-colors">BRIDAL</Link>
                    <Link href="/collection/accessories" className="text-sm tracking-widest hover:text-accent transition-colors">ACCESSORIES</Link>
                </nav>

                {/* Icons */}
                <div className="flex space-x-6 items-center">
                    <Link href="/account">
                        <UserIcon className="h-5 w-5 hover:text-accent transition-colors" />
                    </Link>
                    <button className="relative group">
                        <ShoppingBagIcon className="h-5 w-5 hover:text-accent transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t p-6 md:hidden flex flex-col space-y-4 shadow-md">
                    <Link href="/collection/new-arrivals" onClick={() => setMobileMenuOpen(false)}>NEW ARRIVALS</Link>
                    <Link href="/collection/ball-gowns" onClick={() => setMobileMenuOpen(false)}>BALL GOWNS</Link>
                    <Link href="/collection/bridal" onClick={() => setMobileMenuOpen(false)}>BRIDAL</Link>
                </div>
            )}
        </header>
    );
}
