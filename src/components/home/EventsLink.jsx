import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function EventsLink() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(buttonRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 px-6 bg-black text-white relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-900/10 blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto text-center z-10 relative">
                <h2 ref={titleRef} className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-tight">
                    Experience the <span className="text-purple-500">Chaos</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Creativity</span>
                </h2>

                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                    Join us for 3 days of non-stop innovation, competition, and celebration. From hackathons to cultural nights, Synfest 2026 has it all.
                </p>

                <div ref={buttonRef}>
                    <Link
                        to="/events"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-purple-600 hover:text-white transition-all duration-300"
                    >
                        Explore Events
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
