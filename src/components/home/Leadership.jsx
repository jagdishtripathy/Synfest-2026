import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const dignitaries = [
    {
        id: 1,
        name: "Mr. Binod Dash",
        title: "Hon. Chairman",
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
    const cardsContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const cards = cardsContainerRef.current;
                const scrollWidth = cards.scrollWidth - window.innerWidth;

                gsap.to(cards, {
                    x: -scrollWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        pin: true,
                        scrub: 1,
                        start: 'top top',
                        end: () => `+=${scrollWidth}`,
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative">
                {/* Sticky Title */}
                <div className="sticky top-16 h-screen flex flex-col justify-start z-0 pointer-events-none">
                    <p className="text-primary font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base pl-2">Guiding Lights</p>
                    <h2 className="text-[18vw] tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white leading-[0.8] opacity-90 font-frakturi max-w-[100%]">
                        Visionaries
                    </h2>
                </div>

                {/* Horizontal Cards Container - Desktop Only */}
                <div className="hidden md:block h-screen relative z-20 -mt-[70vh]">
                    <div 
                        ref={cardsContainerRef}
                        className="flex flex-row gap-4 items-center pl-[50vw]"
                        style={{ width: 'max-content' }}
                    >
                        {dignitaries.map((person) => (
                            <div
                                key={person.id}
                                className="flex flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] w-[700px] h-[380px] shrink-0"
                            >
                                {/* Image Section */}
                                <div className="w-2/5 h-full relative shrink-0">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
                                </div>

                                {/* Content Section */}
                                <div className="w-3/5 p-8 flex flex-col justify-center relative">
                                    <div className="mb-4">
                                        <h3 className="text-3xl font-bold text-white mb-2">
                                            {person.name}
                                        </h3>
                                        <p className="text-primary font-bold tracking-widest uppercase text-xs">
                                            {person.title}
                                        </p>
                                    </div>

                                    <blockquote className="text-base font-serif italic text-gray-300 leading-relaxed border-l-4 border-primary pl-4 py-2">
                                        "{person.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}
                        <div className="w-[10vw] shrink-0"></div> {/* Spacer */}
                    </div>
                </div>

                {/* Mobile Vertical Layout */}
                <div className="md:hidden flex flex-col gap-16 pb-20 -mt-[80vh] relative z-20">
                    {dignitaries.map((person) => (
                        <div
                            key={person.id}
                            className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] max-w-full mx-auto"
                        >
                            <div className="w-full h-[300px] relative">
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            </div>

                            <div className="p-6 flex flex-col justify-center relative">
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold text-white mb-2">
                                        {person.name}
                                    </h3>
                                    <p className="text-primary font-bold tracking-widest uppercase text-xs">
                                        {person.title}
                                    </p>
                                </div>

                                <blockquote className="text-lg font-serif italic text-gray-300 leading-relaxed border-l-4 border-primary pl-4 py-2">
                                    "{person.quote}"
                                </blockquote>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
