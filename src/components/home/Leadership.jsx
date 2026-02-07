import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dignitaries = [
    {
        id: 1,
        name: "Dr. A.K. Sahoo",
        title: "Chairman",
        quote: "Innovation is the heartbeat of progress. Synfest is where we restart that heart every year.",
        image: "/person1.png"
    },
    {
        id: 2,
        name: "Prof. S. Das",
        title: "Principal",
        quote: "Education is not just about books, it's about building character through challenges.",
        image: "/person2.png"
    },
    {
        id: 3,
        name: "Dr. R. Mishra",
        title: "Dean of Student Affairs",
        quote: "The energy of our students is our greatest renewable resource. Unleash it.",
        image: "/person3.png"
    },
    {
        id: 4,
        name: "Mr. P.K. Jena",
        title: "Synfest Coordinator",
        quote: "A festival of this magnitude requires not just effort, but a shared vision of excellence.",
        image: "/person4.png"
    }
];

export default function Leadership() {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null); // The pinned container
    const cardsRef = useRef([]);

    useEffect(() => {
        // Only run animation on desktop (md and up)
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            // Horizontal Scroll Tween
            // 1. Pin the section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: "+=3000", // Increased scroll distance for slower readability
                }
            });

            // Move container left
            tl.to(cardsRef.current, {
                xPercent: -100 * (dignitaries.length - 1),
                ease: "none",
            });
        });

        return () => mm.revert();
    }, []);

    return (
        <section className="bg-black text-white py-20 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,40,180,0.05),transparent_70%)] pointer-events-none"></div>

            <div className="container mx-auto px-6 mb-8 md:mb-16 relative z-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2">
                    Visionaries
                </h2>
                <div className="h-1 w-20 bg-purple-600 mb-6"></div>
                <p className="text-zinc-400 max-w-xl text-lg">
                    The leadership guiding Synfest 2026 into the future.
                </p>
            </div>

            {/* Desktop Horizontal Scroll Container */}
            <div ref={triggerRef} className="hidden md:flex h-screen items-center overflow-hidden relative z-10">
                <div className="flex gap-32 pl-[20vw]" style={{ width: 'max-content' }}>
                    {dignitaries.map((person, index) => (
                        <div
                            key={person.id}
                            ref={el => cardsRef.current[index] = el}
                            className="group relative w-[1000px] h-[500px] flex bg-zinc-900 border border-zinc-800 shrink-0 overflow-hidden"
                        >
                            {/* Accent Line */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-purple-600 z-20 group-hover:w-2 transition-all duration-300"></div>

                            {/* Image Section (40%) */}
                            <div className="w-[40%] h-full relative overflow-hidden">
                                <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                            </div>

                            {/* Content Section (60%) */}
                            <div className="w-[60%] p-12 flex flex-col justify-between relative bg-gradient-to-br from-zinc-900 to-zinc-950">
                                {/* Quote Icon */}
                                <div className="text-8xl text-purple-900/20 font-serif absolute top-6 right-8 select-none">"</div>

                                <div className="relative z-10 mt-4">
                                    <blockquote className="text-2xl md:text-3xl font-light text-zinc-300 leading-relaxed">
                                        "{person.quote}"
                                    </blockquote>
                                </div>

                                <div className="relative z-10 border-t border-zinc-800 pt-8 mt-auto">
                                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white group-hover:text-purple-400 transition-colors">
                                        {person.name}
                                    </h3>
                                    <p className="text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase mt-2">
                                        // {person.title}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="w-[20vw]"></div> {/* Spacer */}
                </div>
            </div>

            {/* Mobile Vertical Stack */}
            <div className="md:hidden flex flex-col gap-16 px-6 pb-20">
                {dignitaries.map((person, index) => (
                    <div key={person.id} className="relative">
                        {/* Mobile Design: Magazine Style */}
                        <div className="aspect-[4/5] w-full overflow-hidden mb-6 border-l-4 border-purple-600">
                            <img
                                src={person.image}
                                alt={person.name}
                                className="w-full h-full object-cover filter grayscale"
                            />
                        </div>

                        <div className="pl-4">
                            <h3 className="text-3xl font-black uppercase tracking-tighter text-white leading-none mb-1">{person.name}</h3>
                            <p className="text-purple-500 font-mono text-xs tracking-widest uppercase mb-6">{person.title}</p>

                            <blockquote className="text-zinc-400 text-lg leading-relaxed border-l border-zinc-800 pl-4 py-2">
                                "{person.quote}"
                            </blockquote>
                        </div>

                        <div className="absolute -z-10 -right-4 -top-4 text-9xl text-zinc-900 font-black opacity-50 select-none">
                            0{index + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
