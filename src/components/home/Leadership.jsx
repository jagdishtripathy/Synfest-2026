import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leadershipData } from '../../data/leaderships';

gsap.registerPlugin(ScrollTrigger);

// Helper to calculate grid configuration based on member count
const getGridConfig = (count) => {
    // Dimensions
    const LARGE_WIDTH = "364px";
    const SMALL_WIDTH = "174px";

    // Config object
    let config = {
        template: "",
        largeIndices: [] // Indices of items that should be Large (Span 2 Rows)
    };

    if (count === 1) {
        config.template = `${LARGE_WIDTH}`;
        config.largeIndices = [0];
    } else if (count === 2) {
        config.template = `${LARGE_WIDTH} ${LARGE_WIDTH}`;
        config.largeIndices = [0, 1];
    } else if (count % 2 !== 0) {
        // Odd numbers (3, 5, 7, etc.) -> 1 Large + (n-1) Small stacked
        // 1 Large col + (n-1)/2 Small cols
        const smallCols = (count - 1) / 2;
        config.template = `${LARGE_WIDTH} repeat(${smallCols}, ${SMALL_WIDTH})`;
        config.largeIndices = [0]; // First one is large
    } else {
        // Even numbers >= 4 (4, 6, 8...) -> All Small
        // n/2 Small cols
        const cols = count / 2;
        config.template = `repeat(${cols}, ${SMALL_WIDTH})`;
        config.largeIndices = []; // None are large
    }

    return config;
};

export default function Leadership() {
    const wrapperRef = useRef(null); // Wrapper for GSAP pin spacer
    const sectionRef = useRef(null);
    const cardsContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const cards = cardsContainerRef.current;
                if (!cards) return;
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
        }, wrapperRef); // Context scoped to wrapper

        return () => {
            // Kill all ScrollTriggers in this context
            ScrollTrigger.getAll().forEach(t => t.kill());
            ctx.revert();
        };
    }, []);

    return (
        // WRAPPER DIV - Critical for React + GSAP pin compatibility
        <div ref={wrapperRef}>
            <section ref={sectionRef} className="bg-black text-white relative overflow-hidden pt-15">
                <div className="">
                    {/* Sticky Title */}
                    <div className="h-screen flex flex-col justify-start z-0 pointer-events-none">
                        <h2 className="text-center text-[18vw] tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white leading-[0.8] opacity-90 font-frakturi max-w-[100%]">
                            Visionaries
                        </h2>
                    </div>

                    {/* Horizontal Cards Container - Desktop Only */}
                    <div className="hidden md:flex absolute inset-0 z-20 items-center overflow-hidden pointer-events-none">
                        <div
                            ref={cardsContainerRef}
                            className="flex flex-row gap-8 items-center pl-[50vw] pointer-events-auto"
                            style={{ width: 'max-content' }}
                        >
                            {/* Admin/Chairman Section (Special Styling) */}
                            {leadershipData.admin.map((person, index) => (
                                <div key={index} className="flex flex-row bg-amber-500/10 border border-amber-500/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_0_rgba(245,158,11,0.2)] w-[700px] h-[380px] shrink-0 mr-12 relative">
                                    {/* Glowing Effect */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                                    <div className="w-2/5 h-full relative shrink-0">
                                        <img src={person.image} alt={person.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    <div className="w-3/5 p-12 flex flex-col justify-center relative">
                                        <h3 className="text-5xl font-black text-white mb-2 leading-tight">{person.name}</h3>
                                        <p className="text-amber-400 font-bold tracking-[0.3em] uppercase text-sm mb-8">{person.title}</p>
                                        <blockquote className="text-xl font-serif italic text-gray-200 leading-relaxed border-l-4 border-amber-500 pl-6 py-2">
                                            "{person.quote}"
                                        </blockquote>
                                    </div>
                                </div>
                            ))}

                            {/* Standard Wings Loop with Dynamic Grid */}
                            {[
                                { key: "btech", color: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10" },
                                { key: "diploma", color: "text-orange-400", border: "border-orange-500", bg: "bg-orange-500/10" },
                                { key: "nursing", color: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10" },
                                { key: "bsc", color: "text-green-400", border: "border-green-500", bg: "bg-green-500/10" },
                                { key: "student", color: "text-purple-400", border: "border-purple-500", bg: "bg-purple-500/10" },
                            ].map((wing) => {
                                const members = leadershipData[wing.key];
                                if (!members) return null; // Safety check
                                const { template, largeIndices } = getGridConfig(members.length);

                                return (
                                    <div
                                        key={wing.key}
                                        className="grid gap-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg h-[480px] shrink-0 p-4 mr-8"
                                        style={{
                                            gridTemplateColumns: template,
                                            gridTemplateRows: "repeat(2, 1fr)",
                                            gridAutoFlow: "column dense",
                                            width: "max-content"
                                        }}
                                    >
                                        {members.map((person, index) => {
                                            const isLarge = largeIndices.includes(index);

                                            // Special styling for Large Cards
                                            return (
                                                <div
                                                    key={index}
                                                    className={`relative group overflow-hidden rounded-xl border border-white/5 bg-white/5 ${isLarge ? 'row-span-2' : 'row-span-1'} ${isLarge ? wing.bg : ''}`}
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src={person.image}
                                                        alt={person.name}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />

                                                    {/* Gradient Overlay */}
                                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${isLarge ? 'opacity-60' : 'opacity-80'}`}></div>

                                                    {/* Content Overlay */}
                                                    <div className={`absolute bottom-0 left-0 w-full flex flex-col justify-end ${isLarge ? 'p-6' : 'p-3'}`}>
                                                        <h3 className={`${isLarge ? 'text-3xl' : 'text-lg'} font-bold text-white leading-tight mb-1`}>
                                                            {person.name}
                                                        </h3>
                                                        <p className={`${wing.color} font-bold uppercase tracking-wider ${isLarge ? 'text-sm' : 'text-[10px]'}`}>
                                                            {person.title}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}

                            <div className="w-[10vw] shrink-0"></div> {/* Spacer */}
                        </div>
                    </div>

                    {/* Mobile Vertical Layout */}
                    <div className="md:hidden flex flex-col gap-2 pb-20 -mt-[90vh] relative z-20">
                        {/* Admin/Chairman Section */}
                        {/* Admin/Chairman Section */}
                        {leadershipData.admin.map((person, index) => (
                            <div key={index} className="flex flex-row bg-amber-500/10 border border-amber-500/30 rounded-2xl overflow-hidden backdrop-blur-sm shadow-[0_8px_32px_0_rgba(245,158,11,0.2)] w-[90vw] h-48 shrink-0 relative mx-auto">
                                {/* Glowing Effect */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[40px] pointer-events-none"></div>

                                <div className="w-2/5 h-full relative shrink-0">
                                    <img src={person.image} alt={person.name} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
                                </div>
                                <div className="w-3/5 p-4 flex flex-col justify-center relative">
                                    <h3 className="text-xl font-black text-white mb-1 leading-tight">
                                        {person.name}
                                    </h3>
                                    <p className="text-amber-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-2">{person.title}</p>
                                    <blockquote className="text-[10px] font-serif italic text-gray-300 leading-relaxed border-l-2 border-amber-500 pl-3 py-1 opacity-90 line-clamp-3">
                                        "{person.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}


                        {/* Mobile Wings Loop - Netflix Style */}
                        {[
                            { key: "btech", color: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10" },
                            { key: "diploma", color: "text-orange-400", border: "border-orange-500", bg: "bg-orange-500/10" },
                            { key: "nursing", color: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10" },
                            { key: "bsc", color: "text-green-400", border: "border-green-500", bg: "bg-green-500/10" },
                            { key: "student", color: "text-purple-400", border: "border-purple-500", bg: "bg-purple-500/10" },
                        ].map((wing, i) => {
                            const members = leadershipData[wing.key];
                            if (!members) return null; // Safety check
                            return (
                                <div key={i} className="flex flex-col gap-2 mb-2">

                                    {/* Horizontal Scroll Strip (Netflix Style) */}
                                    <div className="flex overflow-x-auto gap-2 px-6 pr-0 snap-x snap-mandatory scrollbar-hide relative ">

                                        {/* STICKY WING TITLE CARD */}
                                        <div className={`sticky left-0 shrink-0 w-screen rounded-2xl overflow-hidden border border-white/5 ${wing.bg} backdrop-blur-sm flex flex-col justify-center  z-0`}>
                                            <h3 className={`text-4xl pl-9 font-black uppercase tracking-wider ${wing.color} drop-shadow-lg px-4 font-frakturi`}>
                                                {wing.key} <br /> <span className="text-white text-2xl">WING</span>
                                            </h3>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                                        </div>

                                        {/* MEMBER CARDS (Scroll Over) */}
                                        {members.map((person, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`snap-center shrink-0 w-[35vw] aspect-[3/4] relative rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-md z-10 first:ml-0`}
                                                >
                                                    <img
                                                        src={person.image}
                                                        alt={person.name}
                                                        loading="lazy"
                                                        decoding="async"
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                                                    <div className="absolute bottom-0 left-0 w-full p-3">
                                                        <h4 className="text-xs font-bold text-white leading-tight mb-1">{person.name}</h4>
                                                        <p className={`${wing.color} font-bold uppercase tracking-wider text-[6px]`}>{person.title}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {/* Spacer for right padding */}
                                        <div className="w-2 shrink-0"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div >
            </section >
        </div >
    );
}
