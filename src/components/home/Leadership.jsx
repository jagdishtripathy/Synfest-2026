import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Ok go 
// I have added some new photo {"file":{"numFiles":1,"absoluteUri":"file:///d%3A/Web_Development/Synfest%202026/public/Mr-Biswajit-Mishra-coordinator-diploma.jpeg","workspaceUrisToRelativePaths":{"file:///d%3A/Web_Development/Synfest%202026":"public/Mr-Biswajit-Mishra-coordinator-diploma.jpeg"}}} {"file":{"numFiles":1,"absoluteUri":"file:///d%3A/Web_Development/Synfest%202026/public/Mrs-Helen-Behera-coordinator-nursing.jpeg","workspaceUrisToRelativePaths":{"file:///d%3A/Web_Development/Synfest%202026":"public/Mrs-Helen-Behera-coordinator-nursing.jpeg"}}} {"file":{"numFiles":1,"absoluteUri":"file:///d%3A/Web_Development/Synfest%202026/public/Ms-Suchismita-Pattanaik-co-coordinator-nursing.jpeg","workspaceUrisToRelativePaths":{"file:///d%3A/Web_Development/Synfest%202026":"public/Ms-Suchismita-Pattanaik-co-coordinator-nursing.jpeg"}}} 

// Import themand also do you r tsk proposed properly 


gsap.registerPlugin(ScrollTrigger);

const leadershipData = {
    admin: [
        {
            id: 1,
            name: "Mr. Binod Dash",
            title: "Hon. Chairman",
            quote: "Innovation is the heartbeat of progress. Synfest is where we restart that heart every year.",
            image: "/Mr-Binod-Das.png"
        }
    ],
    diploma: [
        {
            id: "d0",
            name: "Mr. Biswajit Mishra",
            title: "Coordinator (Diploma)",
            quote: "Leading with vision, inspiring with action.",
            image: "/Mr-Biswajit-Mishra-coordinator-diploma.jpeg"
        },
        {
            id: "d1",
            name: "Mr. Krushna Chandra Rout",
            title: "Co-coordinator (Diploma)",
            quote: "Technical excellence meets creative spirit.",
            image: "/Mr-Krushna-Chandra-Rout-Diploma-co-coordinator.jpeg"
        },
        {
            id: "d2",
            name: "Mr. Tapas Samal",
            title: "Member (Diploma)",
            quote: "Building foundations for future technology.",
            image: "/Mr-Tapas-Samal-member-diploma.jpeg"
        },
        {
            id: "d3",
            name: "Mrs. Prajna Paramita Kabi",
            title: "Member (Diploma)",
            quote: "Empowering students to achieve their potential.",
            image: "/Mrs-Prajna-paramita-Kabi-member-diploma.jpeg"
        },
        {
            id: "d4",
            name: "Ms. Amrita Aiswarya Nanda",
            title: "Member (Diploma)",
            quote: "Creativity is intelligence having fun.",
            image: "/Ms-Amrita-Aiswarya-Nanda-member-diploma.jpeg"
        },
        {
            id: "d5",
            name: "Ms. Asmita Pranayini",
            title: "Member (Diploma)",
            quote: "Dedication invites excellence.",
            image: "/Ms-Asmita-Pranayini-member-diploma.jpeg"
        },
        {
            id: "d6",
            name: "Ms. Supriya Singh",
            title: "Member (Diploma)",
            quote: "Striving for a brighter tomorrow.",
            image: "/Ms-Supriya-Singh-member-diploma.jpeg"
        },
        {
            id: "d7",
            name: "Ms. Sushree Sangita Satpathy",
            title: "Member (Diploma)",
            quote: "Unity in diversity.",
            image: "/Ms-Sushree-sangita-Satpathy-diploma-member.jpeg"
        }
    ],
    bsc: [
        {
            id: "b1",
            name: "Ms. Rutuparna Sahoo",
            title: "Cultural Co-ordinator (B.Sc)",
            quote: "Science and art are two sides of the same coin.",
            image: "/Ms-Rutuparna-Sahoo-BSC-cultural-co-ordinator.jpeg" // Fixed extension
        },
        {
            id: "b2",
            name: "Faculty Member",
            title: "Member (B.Sc)",
            quote: "Exploring the unknown boundaries of science.",
            image: "/Spiderman.png"
        },
        {
            id: "b3",
            name: "Faculty Member",
            title: "Member (B.Sc)",
            quote: "Knowledge is the path to greatness.",
            image: "/Spiderwoman.png"
        },
        {
            id: "b4",
            name: "Faculty Member",
            title: "Member (B.Sc)",
            quote: "Inspiring the next generation.",
            image: "/Spiderman.png"
        }
    ],
    btech: [
        {
            id: "bt1",
            name: "Prof. S. Das",
            title: "Principal (B.Tech)",
            quote: "Building character through challenges.",
            image: "/Spiderman.png" // Using person2 as Principal placeholders
        },
        {
            id: "bt2",
            name: "Faculty Member",
            title: "Co-ordinator (B.Tech)",
            quote: "Engineering the future, today.",
            image: "/Spiderman.png"
        },
        {
            id: "bt3",
            name: "Faculty Member",
            title: "Member (B.Tech)",
            quote: "Innovation starts with a single idea.",
            image: "/Spiderwoman.png"
        },
        {
            id: "bt4",
            name: "Faculty Member",
            title: "Member (B.Tech)",
            quote: "Technology for a better world.",
            image: "/Spiderman.png"
        }
    ],
    nursing: [
        {
            id: "n1",
            name: "Mrs. Helen Behera",
            title: "Coordinator (Nursing)",
            quote: "Care, compassion, and commitment.",
            image: "/Mrs-Helen-Behera-coordinator-nursing.jpeg"
        },
        {
            id: "n2",
            name: "Ms. Suchismita Pattanaik",
            title: "Co-coordinator (Nursing)",
            quote: "Healing hands, caring hearts.",
            image: "/Ms-Suchismita-Pattanaik-co-coordinator-nursing.jpeg"
        },
        {
            id: "n3",
            name: "Faculty Member",
            title: "Member (Nursing)",
            quote: "Service to humanity is service to God.",
            image: "/Spiderwoman.png"
        },
        {
            id: "n4",
            name: "Faculty Member",
            title: "Member (Nursing)",
            quote: "Excellence in healthcare education.",
            image: "/Spiderwoman.png"
        }
    ]
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
                    <div className="hidden md:flex absolute inset-0 z-20 items-center overflow-hidden pointer-events-none">
                        <div
                            ref={cardsContainerRef}
                            className="flex flex-row gap-8 items-center pl-[50vw] pointer-events-auto"
                            style={{ width: 'max-content' }}
                        >
                            {/* Admin/Chairman Section (Special Styling) */}
                            {leadershipData.admin.map((person) => (
                                <div key={person.id} className="flex flex-row bg-amber-500/10 border border-amber-500/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-[0_8px_32px_0_rgba(245,158,11,0.2)] w-[700px] h-[380px] shrink-0 mr-12 relative">
                                    {/* Glowing Effect */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                                    <div className="w-2/5 h-full relative shrink-0">
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-60"></div>
                                    </div>
                                    <div className="w-3/5 p-12 flex flex-col justify-center relative">
                                        <h3 className="text-5xl font-black text-white mb-2 leading-tight">{person.name.split(' ')[1]} {person.name.split(' ')[2]}</h3>
                                        <p className="text-amber-400 font-bold tracking-[0.3em] uppercase text-sm mb-8">{person.title}</p>
                                        <blockquote className="text-xl font-serif italic text-gray-200 leading-relaxed border-l-4 border-amber-500 pl-6 py-2">
                                            "{person.quote}"
                                        </blockquote>
                                    </div>
                                </div>
                            ))}

                            {/* Standard Wings Loop with Adaptive Grid */}
                            {[
                                { key: "diploma", color: "text-orange-400", border: "border-orange-500", bg: "bg-orange-500/10" },
                                { key: "bsc", color: "text-green-400", border: "border-green-500", bg: "bg-green-500/10" },
                                { key: "btech", color: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10" },
                                { key: "nursing", color: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10" }
                            ].map((wing) => {
                                const members = leadershipData[wing.key];
                                const count = members.length;

                                // Determine Grid Layout based on member count
                                let gridClass = "grid-cols-2 grid-rows-2"; // Default 4 members
                                if (count === 1) gridClass = "grid-cols-1";
                                if (count === 8) gridClass = "grid-cols-4 grid-rows-2";
                                if (count === 7) gridClass = "grid-cols-4 grid-rows-3"; // Special Bento Layout

                                return (
                                    <div
                                        key={wing.key}
                                        className={`grid ${gridClass} gap-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg w-[900px] h-[480px] shrink-0 p-4 mr-8`}
                                    >
                                        {members.map((person, index) => {
                                            // Determine Card Spanning for Bento Layout (7 members)
                                            // Index 0 (Leader) takes Left Half (2 cols, 3 rows)
                                            const isBentoLeader = count === 7 && index === 0;
                                            const spanClass = isBentoLeader ? "col-span-2 row-span-3" : "col-span-1 row-span-1";

                                            // Special styling for Grid Cards
                                            return (
                                                <div
                                                    key={person.id}
                                                    className={`relative group overflow-hidden rounded-xl border border-white/5 bg-white/5 ${spanClass} ${isBentoLeader ? wing.bg : ''}`}
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src={person.image}
                                                        alt={person.name}
                                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />

                                                    {/* Gradient Overlay */}
                                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${isBentoLeader ? 'opacity-60' : 'opacity-80'}`}></div>

                                                    {/* Content Overlay */}
                                                    <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end">
                                                        <h3 className={`${isBentoLeader ? 'text-3xl' : 'text-sm'} font-bold text-white leading-tight mb-1`}>
                                                            {person.name}
                                                        </h3>
                                                        <p className={`${wing.color} font-bold uppercase tracking-wider ${isBentoLeader ? 'text-sm' : 'text-[10px]'}`}>
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
                    <div className="md:hidden flex flex-col gap-16 pb-20 -mt-[80vh] relative z-20">
                        {/* Admin/Chairman Section */}
                        {leadershipData.admin.map((person) => (
                            <div key={person.id} className="flex flex-col bg-amber-500/10 border border-amber-500/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg max-w-full mx-auto">
                                <div className="w-full h-[400px] relative">
                                    <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                </div>
                                <div className="p-6 flex flex-col justify-center relative">
                                    <h3 className="text-3xl font-bold text-white mb-2">{person.name}</h3>
                                    <p className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-4">{person.title}</p>
                                    <blockquote className="text-lg font-serif italic text-gray-300 border-l-4 border-amber-500 pl-4 py-2">
                                        "{person.quote}"
                                    </blockquote>
                                </div>
                            </div>
                        ))}

                        {/* Mobile Wings Loop - Netflix Style */}
                        {[
                            { key: "diploma", color: "text-orange-400", border: "border-orange-500", bg: "bg-orange-500/10" },
                            { key: "bsc", color: "text-green-400", border: "border-green-500", bg: "bg-green-500/10" },
                            { key: "btech", color: "text-blue-400", border: "border-blue-500", bg: "bg-blue-500/10" },
                            { key: "nursing", color: "text-pink-400", border: "border-pink-500", bg: "bg-pink-500/10" }
                        ].map((wing, i) => {
                            const members = leadershipData[wing.key];
                            return (
                                <div key={i} className="flex flex-col gap-6 mb-8">
                                    {/* Section Header */}
                                    <div className="flex items-center gap-4 pl-6">
                                        <div className={`h-8 w-1 ${wing.bg.replace('/10', '')} rounded-full`}></div>
                                        <h3 className={`text-2xl font-bold uppercase tracking-widest ${wing.color}`}>{wing.key} Wing</h3>
                                    </div>

                                    {/* Horizontal Scroll Strip (Netflix Style) */}
                                    <div className="flex overflow-x-auto gap-4 pb-4 px-6 snap-x snap-mandatory scrollbar-hide">
                                        {members.map((person) => (
                                            <div
                                                key={person.id}
                                                className="snap-center shrink-0 w-[220px] aspect-[3/4] relative rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-md"
                                            >
                                                <img
                                                    src={person.image}
                                                    alt={person.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                                                <div className="absolute bottom-0 left-0 w-full p-3">
                                                    <h4 className="text-lg font-bold text-white leading-tight mb-1">{person.name}</h4>
                                                    <p className={`${wing.color} font-bold uppercase tracking-wider text-[10px]`}>{person.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                        {/* Spacer for right padding */}
                                        <div className="w-2 shrink-0"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
