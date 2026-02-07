import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Sponsors() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const content = marqueeRef.current.querySelector('.marquee-content');

            // Clone content for infinite loop
            const clone = content.cloneNode(true);
            marqueeRef.current.appendChild(clone);

            gsap.to(marqueeRef.current.children, {
                xPercent: -100,
                repeat: -1,
                duration: 25,
                ease: "linear",
            });
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    const sponsors = [
        "Google", "Microsoft", "Red Bull", "Spotify", "GitHub", "Vercel", "Samsung", "Coca-Cola"
    ];

    return (
        <section className="py-20 bg-black overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 mb-12 text-center">
                <p className="text-sm font-bold tracking-[0.3em] uppercase text-gray-500 mb-2">Supported By</p>
                <h2 className="text-3xl font-black uppercase text-white">Our Partners</h2>
            </div>

            <div className="relative w-full flex overflow-hidden" ref={marqueeRef}>
                <div className="marquee-content flex gap-16 md:gap-32 items-center whitespace-nowrap px-8">
                    {sponsors.map((sponsor, index) => (
                        <span key={index} className="text-4xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-white/5 hover:from-primary hover:to-red-600 transition-all duration-300 cursor-pointer">
                            {sponsor}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
