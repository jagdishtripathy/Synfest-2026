import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal animation
            gsap.from(textRef.current.children, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Image parallax
            gsap.to(imageRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: -50,
                ease: "none"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="py-24 px-6 md:px-12 bg-[#0a0a0a] text-white flex flex-col md:flex-row items-center gap-16 overflow-hidden">

            {/* Text Content */}
            <div ref={textRef} className="flex-1 z-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white">
                    Where Innovation Meets Tradition
                </h2>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                    Synergy Institute of Engineering & Technology, Dhenkanal, invites you to witness the grandest spectacle of the year.
                    <strong className="text-white"> Synfest 2026</strong> is not just a fest; it's a celebration of talent, technology, and culture.
                </p>
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                    From coding marathons to electrifying dance battles, from robotics to ramp walks — we have it all. Join us for 3 days of non-stop energy.
                </p>

                <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-primary">
                    <span>3 Days</span>
                    <span>50+ Events</span>
                    <span>1000+ Participants</span>
                </div>
            </div>

            {/* Visual / Image Placeholder */}
            <div className="flex-1 flex justify-center items-center">
                <div ref={imageRef} className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative hover:scale-105 transition-transform duration-500">
                    <img
                        src="/media/logo2.png"
                        alt="Synergy Institute Logo"
                        className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(220,38,38,0.4)]"
                    />
                </div>
            </div>
        </section>
    );
}
