import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
            image: "https://avatar.iran.liara.run/public/job/teacher/male"
        },
        {
            id: "b3",
            name: "Faculty Member",
            title: "Member (B.Sc)",
            quote: "Knowledge is the path to greatness.",
            image: "https://avatar.iran.liara.run/public/job/teacher/female"
        },
        {
            id: "b4",
            name: "Faculty Member",
            title: "Member (B.Sc)",
            quote: "Inspiring the next generation.",
            image: "https://avatar.iran.liara.run/public/job/teacher/male"
        }
    ],
    btech: [
        {
            id: "bt1",
            name: "Prof. S. Das",
            title: "Principal (B.Tech)",
            quote: "Building character through challenges.",
            image: "/person2.png" // Using person2 as Principal placeholders
        },
        {
            id: "bt2",
            name: "Faculty Member",
            title: "Co-ordinator (B.Tech)",
            quote: "Engineering the future, today.",
            image: "https://avatar.iran.liara.run/public/job/engineer/male"
        },
        {
            id: "bt3",
            name: "Faculty Member",
            title: "Member (B.Tech)",
            quote: "Innovation starts with a single idea.",
            image: "https://avatar.iran.liara.run/public/job/engineer/female"
        },
        {
            id: "bt4",
            name: "Faculty Member",
            title: "Member (B.Tech)",
            quote: "Technology for a better world.",
            image: "https://avatar.iran.liara.run/public/job/engineer/male"
        }
    ],
    nursing: [
        {
            id: "n1",
            name: "Faculty Member",
            title: "Principal (Nursing)",
            quote: "Care, compassion, and commitment.",
            image: "https://avatar.iran.liara.run/public/job/doctor/female"
        },
        {
            id: "n2",
            name: "Faculty Member",
            title: "Co-ordinator (Nursing)",
            quote: "Healing hands, caring hearts.",
            image: "https://avatar.iran.liara.run/public/job/doctor/female"
        },
        {
            id: "n3",
            name: "Faculty Member",
            title: "Member (Nursing)",
            quote: "Service to humanity is service to God.",
            image: "https://avatar.iran.liara.run/public/job/doctor/male"
        },
        {
            id: "n4",
            name: "Faculty Member",
            title: "Member (Nursing)",
            quote: "Excellence in healthcare education.",
            image: "https://avatar.iran.liara.run/public/job/doctor/female"
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
                    <div className="hidden md:block h-screen relative z-20 -mt-[70vh]">
                        <div
                            ref={cardsContainerRef}
                            className="flex flex-row gap-4 items-center pl-[50vw]"
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

                            {/* Standard Wings Loop */}
                            {[
                                { key: "diploma", color: "text-orange-400", border: "border-orange-500" },
                                { key: "bsc", color: "text-green-400", border: "border-green-500" },
                                { key: "btech", color: "text-blue-400", border: "border-blue-500" },
                                { key: "nursing", color: "text-pink-400", border: "border-pink-500" }
                            ].map((wing) => (
                                leadershipData[wing.key].map((person) => (
                                    <div key={person.id} className="flex flex-row bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg w-[700px] h-[380px] shrink-0">
                                        <div className="w-2/5 h-full relative shrink-0">
                                            <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-80"></div>
                                        </div>
                                        <div className="w-3/5 p-8 flex flex-col justify-center relative">
                                            <h3 className="text-3xl font-bold text-white mb-2">{person.name}</h3>
                                            <p className={`${wing.color} font-bold tracking-widest uppercase text-xs mb-4`}>{person.title}</p>
                                            <blockquote className={`text-base font-serif italic text-gray-300 border-l-4 ${wing.border} pl-4 py-2`}>"{person.quote}"</blockquote>
                                        </div>
                                    </div>
                                ))
                            ))}

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

                        {/* Wings Loop */}
                        {[
                            { name: "Diploma Wing", data: leadershipData.diploma, color: "text-orange-400", border: "border-orange-500" },
                            { name: "B.Sc Wing", data: leadershipData.bsc, color: "text-green-400", border: "border-green-500" },
                            { name: "B.Tech Wing", data: leadershipData.btech, color: "text-blue-400", border: "border-blue-500" },
                            { name: "Nursing Wing", data: leadershipData.nursing, color: "text-pink-400", border: "border-pink-500" }
                        ].map((wing, i) => (
                            <div key={i} className="flex flex-col gap-6">
                                <h3 className={`text-2xl font-bold uppercase tracking-widest pl-4 border-l-4 ${wing.border} ${wing.color}`}>{wing.name}</h3>
                                {wing.data.map((person) => (
                                    <div key={person.id} className="flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-lg max-w-full mx-auto">
                                        <div className="w-full h-[300px] relative">
                                            <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                        </div>
                                        <div className="p-6 flex flex-col justify-center relative">
                                            <h3 className="text-2xl font-bold text-white mb-2">{person.name}</h3>
                                            <p className={`${wing.color} font-bold tracking-widest uppercase text-xs mb-4`}>{person.title}</p>
                                            <blockquote className={`text-base font-serif italic text-gray-300 border-l-4 ${wing.border} pl-4 py-2`}>
                                                "{person.quote}"
                                            </blockquote>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
