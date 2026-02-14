import { useLayoutEffect, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// Use useLayoutEffect for CSR, useEffect for SSR to avoid warnings
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * reliable hook for GSAP animations with automatic cleanup
 * @param {Function} effect - The animation function
 * @param {Array} deps - Dependency array
 * @returns {Object} ref - The scope ref
 */
export const useGsap = (effect, deps = []) => {
    const scopeRef = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const ctx = gsap.context(effect, scopeRef);
        return () => ctx.revert();
    }, deps);

    return scopeRef;
};

/**
 * Hook to fade up elements when they enter the viewport
 * @param {Object} options - Custom GSAP options
 * @returns {Object} ref - The scope ref
 */
export const useFadeUp = (options = {}, deps = []) => {
    const ref = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            { y: 50, opacity: 0, ...options.from },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    ...options.scrollTrigger,
                },
                ...options.to,
            }
        );
    }, deps);

    return ref;
};

/**
 * Hook to stagger reveal children elements
 * @param {string} selector - The selector for children elements (e.g. '.child')
 * @param {Object} options - Custom GSAP options
 * @returns {Object} ref - The scope ref
 */
export const useStagger = (selector, options = {}, deps = []) => {
    const ref = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        const children = element.querySelectorAll(selector);
        if (children.length === 0) return;

        gsap.fromTo(
            children,
            { y: 30, opacity: 0, ...options.from },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    ...options.scrollTrigger,
                },
                ...options.to,
            }
        );
    }, deps);

    return ref;
};

/**
 * Hook for parallax effect on background images or elements
 * @param {number} speed - The speed of the parallax (negative for reverse)
 * @returns {Object} ref - The scope ref
 */
export const useParallax = (speed = 0.5) => {
    const ref = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.to(element, {
            y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed || -(speed * 100),
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0,
            },
        });
    }, [speed]);

    return ref;
};

/**
 * Hook for a simple reveal animation
 * @param {Object} options - Custom GSAP options
 * @returns {Object} ref - The scope ref
 */
export const useReveal = (options = {}, deps = []) => {
    const ref = useRef(null);

    useIsomorphicLayoutEffect(() => {
        const element = ref.current;
        if (!element) return;

        gsap.fromTo(
            element,
            { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', ...options.from },
            {
                opacity: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    ...options.scrollTrigger,
                },
                ...options.to,
            }
        );
    }, deps);

    return ref;
};
