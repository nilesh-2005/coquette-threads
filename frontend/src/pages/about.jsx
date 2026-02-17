import Head from 'next/head';
import { useGsap, useStagger } from '@/hooks/useGsap';
import { gsap } from '@/lib/gsap';
import { useRef } from 'react';

export default function AboutPage() {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const teamRef = useStagger('.team-member', {
        scrollTrigger: {
            start: 'top 85%',
        }
    });

    useGsap(() => {
        if (headerRef.current) {
            gsap.fromTo(headerRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
            );
        }
        if (contentRef.current) {
            gsap.fromTo(contentRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
            );
        }
    }, []);

    const team = [
        {
            name: "Nilesh",
            role: "Lead Developer",
            image: "/assets/team-placeholder/nilu.jpg", // Reserved for your pic
            bio: "Passionate about building seamless digital experiences and elegant architectures."
        },
        {
            name: "Shruti Sharma",
            role: "Content Strategist",
            image: "/assets/team-placeholder/shruti.jpeg",
            bio: "Creating visual harmony and ensuring every detail reflects the premium essence of the brand."
        },
        {
            name: "Varshika Sharma",
            role: "IDK what are you doing here",
            image: "/assets/team-placeholder/varshika.png",
            bio: "IDK what are you doing here 😭😭."
        }
    ];

    return (
        <>
            <Head>
                <title>Our Story | Coquette Threads</title>
                <meta name="description" content="The story behind Coquette Threads - A premium e-commerce vision created for our collegiate assignment." />
            </Head>

            <main className="bg-[#faf9f6] min-h-screen pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    {/* Header Section */}
                    <div ref={headerRef} className="text-center mb-16">
                        <div className="flex justify-center mb-12">
                            <img
                                src="/logo.png"
                                alt="Coquette Threads Logo"
                                className="h-32 w-auto object-contain"
                            />
                        </div>
                        <span className="text-xs tracking-[0.4em] uppercase text-accent mb-6 block">Our Story</span>
                        <h1 className="text-5xl md:text-7xl font-serif mb-8 tracking-tight text-gray-900 italic">
                            Romance, Tailored.
                        </h1>
                        <div className="w-24 h-px bg-accent/30 mx-auto"></div>
                    </div>

                    {/* Project Description */}
                    <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                        <div className="space-y-6 text-gray-700 leading-relaxed font-serif text-lg">
                            <p>
                                Coquette Threads was born from a vision to blend historical grandeur with modern digital convenience.
                                We believe that fashion is not just about clothing, but about evoking an era of timeless elegance
                                and refined ceremony.
                            </p>
                            <p className="font-bold text-gray-900 border-l-4 border-accent pl-6 py-2 italic text-xl">
                                "This platform is more than just a boutique; it is the culmination of our E-Commerce Subject Assignment at college,
                                representing our journey in mastering the complexities of modern digital trade."
                            </p>
                            <p>
                                From the meticulous selection of bridal gowns to the curated editorial experience of our landing page,
                                every pixel of this project has been crafted to demonstrate contemporary web technologies
                                serving the traditional arts.
                            </p>
                        </div>
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 bg-accent/5 rounded-full animate-pulse-slow"></div>
                            <div className="absolute inset-10 border border-accent/20 rounded-full"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <h3 className="text-3xl font-serif mb-2 text-gray-900">Academic Vision</h3>
                                    <p className="text-accent uppercase tracking-widest text-xs">E-Commerce Finals 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <section>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-serif mb-4">The Creative Minds</h2>
                            <p className="text-gray-500 font-serif italic">The team behind the threads.</p>
                        </div>

                        <div ref={teamRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {team.map((member, idx) => (
                                <div key={idx} className="team-member flex flex-col items-center text-center opacity-0 group">
                                    <div className="relative w-48 h-48 mb-8 overflow-hidden rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-110">
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-serif mb-2 text-gray-900">{member.name}</h3>
                                    <p className="text-accent uppercase tracking-widest text-[10px] mb-4 font-bold">{member.role}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-serif italic">
                                        {member.bio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <style jsx>{`
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </>
    );
}
