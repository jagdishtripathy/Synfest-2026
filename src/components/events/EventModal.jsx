import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, MessageCircle, ExternalLink } from 'lucide-react';

export default function EventModal({ event, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Lock body scroll
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

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

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            ctx.revert();
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                onClose();
            }
        });
    };

    if (!event) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleClose}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md"
        >
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    ref={contentRef}
                    onClick={(e) => e.stopPropagation()}
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
                    <div className="p-6 pb-0 md:p-8 md:pb-0">
                        <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Event Details</span>
                        <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-2 mb-2 md:mb-4 leading-none">
                            <span className="mr-2 md:mr-3">{event.emoji}</span>
                            {event.title}
                        </h2>
                        <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{event.description}</p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            <div className="flex items-start gap-2 md:gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-lg md:text-xl mt-0.5">👥</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-xs md:text-xs">Team Size</h4>
                                    <p className="text-gray-400 text-sm md:text-sm">{event.teamSize}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 md:gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-lg md:text-xl mt-0.5">💰</span>
                                <div>
                                    <h4 className="text-white font-bold uppercase text-xs md:text-xs">Entry Fee</h4>
                                    <p className="text-gray-400 text-sm md:text-sm">{event.fee || "Free"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg md:text-xl">📜</span>
                                <h4 className="text-white font-bold uppercase text-xs md:text-sm">Rules & Regulations</h4>
                            </div>
                            <ul className="text-xs md:text-xs text-gray-400 space-y-1 md:space-y-1.5 list-disc list-inside">
                                {event.rules?.map((rule, i) => (
                                    <li key={i}>{rule}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Logistics Section - Simple Icons & Text Below */}
                    <div className="px-4 py-3 md:px-6 md:pb-6">
                        <div className="flex flex-row justify-between gap-2 md:grid md:grid-cols-3 md:gap-4 pt-3 border-t border-white/10">
                            {/* Venue */}
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-2 flex-1">
                                <span className="text-sm md:text-xl">📍</span>
                                <div>
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] md:text-[10px] tracking-wider">Venue</h4>
                                    <p className="text-white font-medium text-xs md:text-sm leading-tight">{event.venue || "TBA"}</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-2 flex-1 border-white/10 md:border-none pl-2 md:pl-0">
                                <span className="text-sm md:text-xl">📅</span>
                                <div>
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] md:text-[10px] tracking-wider">Date</h4>
                                    <p className="text-white font-medium text-xs md:text-sm leading-tight">{event.date || "TBA"}</p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-1 md:gap-2 flex-1  border-white/10 md:border-none pl-2 md:pl-0">
                                <span className="text-sm md:text-xl">⏰</span>
                                <div>
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] md:text-[10px] tracking-wider">Time</h4>
                                    <p className="text-white font-medium text-xs md:text-sm leading-tight">{event.time || "TBA"}</p>
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
                            className="text-[10px] md:text-sm flex-1 flex items-center justify-center px-4 py-3 md:px-6 md:py-4 bg-green-500 text-black font-bold uppercase tracking-widest hover:bg-green-400 transition-colors duration-300 text-center rounded-lg">
                            <MessageCircle className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />Whatsapp Group
                        </a>
                        <a
                            href={event.regLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] md:text-sm flex-1 flex items-center justify-center px-4 py-3 md:px-8 md:py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors duration-300 text-center rounded-lg">
                            <ExternalLink className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />Register Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
