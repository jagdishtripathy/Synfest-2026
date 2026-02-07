import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate each card on scroll
            cardsRef.current.forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: index * 0.1,
                });

                // Parallax effect on scroll
                gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                    y: -50,
                    ease: 'none',
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const showcaseItems = [
        {
            title: 'Pro Shows',
            description: 'Experience electrifying performances by India\'s top artists and DJs.',
            gradient: 'from-primary to-orange-600',
        },
        {
            title: 'Bot Wars',
            description: 'High-octane robotic combat where steel meets steel in the battle arena.',
            gradient: 'from-blue-600 to-cyan-500',
        },
        {
            title: 'Hackathon',
            description: '24-hour coding marathon to solve real-world problems and win big.',
            gradient: 'from-green-500 to-emerald-500',
        },
    ];

    return (
        <section ref={sectionRef} className="min-h-screen py-24 px-6 md:px-12 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
            <div className="container mx-auto">
                <h2 className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                    Fest Highlights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {showcaseItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            ></div>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4 text-white">{item.title}</h3>
                                <p className="text-gray-400 text-lg leading-relaxed">{item.description}</p>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
