import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

export default function Hero() {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title animation - split text effect
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.2,
            });

            // Subtitle animation
            gsap.from(subtitleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6,
            });

            // Background gradient animation
            gsap.to(heroRef.current, {
                backgroundPosition: '50% 100%',
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, #1a1a2e 0%, #0a0a0a 50%, #0a0a0a 100%)',
                backgroundSize: '100% 200%',
            }}
        >
            <div className="container mx-auto px-6 md:px-12 text-center z-10">
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
                >
                    Synfest 2026
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl lg:text-3xl text-gray-400 max-w-3xl mx-auto font-light tracking-wide"
                >
                    Experience the future of design and animation
                </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
}
