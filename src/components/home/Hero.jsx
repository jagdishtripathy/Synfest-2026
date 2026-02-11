import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Volume2, VolumeX } from 'lucide-react';
import { useVideoContext } from '../../context/VideoContext';
// import MuteToggle from '../ui/MuteToggle';
import Countdown from './Countdown';

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const videoRef = useRef(null);
    const { isMuted, toggleMute } = useVideoContext();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Massive text zoom effect
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
                scale: 1.5,
                opacity: 0,
                y: -100,
            });

            // Video Volume Fade Logic
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                onUpdate: (self) => {
                    if (videoRef.current) {
                        // Always adjust volume based on scroll
                        videoRef.current.volume = Math.max(0, 1 - self.progress);
                    }
                }
            });

        }, containerRef);

        // Initial setup
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
            videoRef.current.volume = 1; // Ensure volume starts at 1
        }

        return () => ctx.revert();
    }, []); // Run ONCE on mount

    // Sync video muted state with context
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    return (
        <section
            id="home"
            ref={containerRef}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white"
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10 transition-opacity duration-700"></div> {/* Overlay/Tint */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover blur-sm scale-110" // blur-sm and scale to avoid edge blur issues
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="z-20 text-center px-4">
                {/* <h2 className="text-sm md:text-lg font-bold tracking-[0.5em] mb-4 text-primary uppercase">
                    Synergy Institute Presents
                </h2> */}
                <h1
                    ref={textRef}
                    className="leading-[0.85] font-frakturi uppercase tracking-tighter"
                    style={{ fontSize: 'clamp(8rem, 15vw, 12rem)' }} // Keep size
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
                        SYNFEST
                    </span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-500 block mt-2 md:mt-4 filter drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                        2K26
                    </span>
                </h1>

                {/* Countdown */}
                <Countdown />
            </div>

            {/* Mute Button - Bottom Right */}
            {/* <MuteToggle className="absolute bottom-10 right-10 z-30" /> */}

            <div className="absolute bottom-10 left-0 w-full flex justify-between px-10 text-xs font-bold tracking-widest opacity-50 uppercase z-20 pointer-events-none">
                <span>Dhenkanal, OD</span>
                <span>Est. 1999</span>
                <span className="opacity-0 md:opacity-100">SCROLL</span>
            </div>
        </section>
    );
}
