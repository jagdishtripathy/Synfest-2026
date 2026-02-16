import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const progressTextRef = useRef(null);

    useEffect(() => {
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline({
            onComplete: () => {
                // Unlock body scroll and notify parent
                document.body.style.overflow = '';
                if (onComplete) onComplete();
            }
        });

        // Initial State
        gsap.set(progressRef.current, { scaleX: 0 });

        // Animation Sequence
        tl.to(progressRef.current, {
            scaleX: 0.75,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
                if (progressTextRef.current) {
                    progressTextRef.current.innerText = Math.round(this.progress() * 75) + "%";
                }
            }
        })
            .to(progressRef.current, {
                scaleX: 0.85,
                duration: 1.0,
                ease: "linear", // Slow crawl
                onUpdate: function () {
                    if (progressTextRef.current) {
                        progressTextRef.current.innerText = Math.round(75 + (this.progress() * 10)) + "%";
                    }
                }
            })
            .to(progressRef.current, {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.inOut", // Fast finish
                onUpdate: function () {
                    if (progressTextRef.current) {
                        progressTextRef.current.innerText = Math.round(85 + (this.progress() * 15)) + "%";
                    }
                }
            })
            .to(loaderRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut",
                delay: 0.2
            });

        return () => {
            // Cleanup: Ensure scroll is unlocked if component unmounts early
            document.body.style.overflow = '';
            tl.kill();
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between items-center text-white px-6 py-10"
        >
            {/* Center Content: Progress */}
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-md">
                <div className="text-6xl md:text-8xl font-black mb-4 font-frakturika tracking-wider text-primary">
                    <span ref={progressTextRef}>0%</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    {/* Progress Bar Fill */}
                    <div
                        ref={progressRef}
                        className="h-full bg-primary origin-left w-full transform scale-x-0"
                    ></div>
                </div>
                <p className="mt-4 text-sm text-gray-500 font-mono animate-pulse">
                    INITIALIZING SYNFEST PROTOCOLS...
                </p>
            </div>

            {/* Bottom Content: Disclaimer */}
<div className="w-full text-center pb-8 md:pb-0">
  <p className="text-[6px] md:text-[8px] text-gray-600 leading-relaxed uppercase tracking-wider font-bold max-w-2xl mx-auto">
    | Synfest 2026 |
    <br className="block" />
    By proceeding, you acknowledge that this site is a creative experiment. All content is for representation purposes only, and the positioning of elements is guided by design aesthetics. Visual hierarchy does not imply official endorsement, priority, or factual ordering.
    <br />
    <br />
    Maintained by{" "}
    <a href="https://www.linkedin.com/in/srsoumyax11" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">Soham</a>{" "}
    |{" "}
    <a href="https://github.com/srsoumyax11" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">GitHub</a>
  </p>
</div>
        </div>
    );
};

export default Loader;
