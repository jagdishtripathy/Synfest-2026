import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, MessageCircle, ExternalLink } from 'lucide-react';

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
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-white mt-2 mb-4">
                        <span className="mr-3">{event.emoji}</span>
                        {event.title}
                    </h2>
                    <p className="text-gray-400 text-lg">{event.description}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xl mt-0.5">👥</span>
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs">Team Size</h4>
                                <p className="text-gray-400 text-sm">{event.teamSize}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-xl mt-0.5">💰</span>
                            <div>
                                <h4 className="text-white font-bold uppercase text-xs">Registration Fee</h4>
                                <p className="text-gray-400 text-sm">{event.fee || "Free"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">📜</span>
                            <h4 className="text-white font-bold uppercase text-sm">Rules & Regulations</h4>
                        </div>
                        <ul className="text-xs text-gray-400 space-y-1.5 list-disc list-inside">
                            {event.rules?.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Logistics Section - Simple Icons & Text Below */}
                <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-white/10">
                        {/* Venue */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <div>
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Venue</h4>
                                <p className="text-white font-medium text-sm">{event.venue || "TBA"}</p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📅</span>
                            <div>
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Date</h4>
                                <p className="text-white font-medium text-sm">{event.date || "TBA"}</p>
                            </div>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-2">
                            <span className="text-xl">⏰</span>
                            <div>
                                <h4 className="text-gray-500 font-bold uppercase text-[10px] tracking-wider">Time</h4>
                                <p className="text-white font-medium text-sm">{event.time || "TBA"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / CTA */}
                {/* Whatsapp Link button */}
                <div className="p-2 pt-0 flex justify-between gap-2">
                    <a
                        href={event.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center px-6 py-4 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-colors duration-300 text-center rounded-lg">
                        <MessageCircle className="mr-2" size={20} />Whatsapp Group
                    </a>
                    <a
                        href={event.regLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 md:flex-none flex items-center justify-center px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 text-center rounded-lg">
                        <ExternalLink className="mr-2" size={20} />Register Now
                    </a>
                </div>
            </div>
        </div>
    );
}
