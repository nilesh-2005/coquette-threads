import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register plugins only once
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Set default defaults
    gsap.defaults({
        ease: 'power3.out',
        duration: 1,
    });

    // Configure ScrollTrigger defaults
    ScrollTrigger.defaults({
        // markers: process.env.NODE_ENV === 'development', // Uncomment for debugging
    });
}

export { gsap, ScrollTrigger };

// Utility helper for fade up animation settings
export const fadeUpConfig = {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
};

// Utility helper for stagger animation settings
export const staggerConfig = {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
};
