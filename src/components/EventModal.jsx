import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, Users, Wallet, ScrollText } from 'lucide-react'; // Ensure lucide-react is installed, if not, I'll recommend installing it or use text.

export default function EventModal({ event, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Overlay Fade In
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );

            // Content Slide Up & Scale
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.95 },
                { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)", delay: 0.1 }
            );
        }, modalRef);

        return () => ctx.revert();
    }, []);

    const handleClose = () => {
        // Animate out before unmounting (optional logic needed in parent, but for now simple close)
        gsap.to(modalRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
    };

    if (!event) return null;

    return (
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div
                ref={contentRef}
                className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-8 pb-0">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Event Details</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">{event.title}</h2>
                    <p className="text-gray-400 text-lg">{event.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Users className="text-red-400 mt-1" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-sm">Team Size</h4>
                                <p className="text-gray-400">{event.teamSize}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                            <Wallet className="text-green-400 mt-1" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-sm">Registration Fee</h4>
                                <p className="text-gray-400">{event.fee}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 mb-3">
                            <ScrollText className="text-blue-400" />
                            <h4 className="text-white font-bold uppercase text-sm">Rules & Regulations</h4>
                        </div>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                            {event.rules?.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer / CTA */}
                <div className="p-8 pt-0 flex justify-end">
                    <a
                        href={event.regLink}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300 text-center rounded-lg"
                    >
                        Register Now
                    </a>
                </div>
            </div>
        </div>
    );
}
