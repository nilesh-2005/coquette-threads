import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useGsap } from '@/hooks/useGsap';
import Link from 'next/link';

export default function HeroEditorial() {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useGsap(() => {
        // Parallax Effect
        gsap.to(imageRef.current, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });

        // Text Reveal
        gsap.fromTo(
            textRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.5,
            }
        );
    }, []);

    return (
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{
                        backgroundImage: "url('/assets/back/back.jpeg')",
                        backgroundColor: '#1a1a1a',
                    }}
                >
                    <div className="absolute inset-0 bg-black/30" />
                </div>
            </div>

            {/* Content */}
            <div ref={textRef} className="relative z-10 text-center text-white p-4">
                <h2 className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-sans">Romance, Tailored</h2>
                <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
                    Modern <br /> Victorian
                </h1>
                <Link href="/collection/new-arrivals" className="inline-block border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300 uppercase">
                    Shop the Collection
                </Link>
            </div>
        </section>
    );
}
