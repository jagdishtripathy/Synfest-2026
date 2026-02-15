import { useRef, useEffect, useState } from 'react'; // Added useState
import { gsap } from 'gsap';
import { X, MessageCircle, ExternalLink, ChevronDown, ChevronUp, FileText, Users } from 'lucide-react'; // Added Chevrons

export default function EventModal({ event, onClose }) {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const [showCoordinators, setShowCoordinators] = useState(false); // State for expansion

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Lock body and html scroll
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

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
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" // Flex center here
        >
            {/* Inner Wrapper Removed to allow true centering */}
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent // explicitly tell lenis to ignore scroll here
                className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[85vh] overflow-y-auto modal-scrollbar" // Internal scroll here
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
                    {/* <span className="text-primary font-bold tracking-widest uppercase text-xs md:text-sm">Event Details</span> */}
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-white mt-2 mb-2 md:mb-4 leading-none">
                        <span className="mr-2 md:mr-3">{event.emoji}</span>
                        {event.title}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{event.description}</p>
                </div>

                {/* Chips Row */}
                <div className="flex flex-wrap gap-2 px-6 md:px-8 py-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span >👥</span>
                        <span >Team Size: <span className="text-white font-bold">{event.teamSize}</span></span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                        <span >💰</span>
                        <span >Entry: <span className="text-white font-bold">{event.fee || "Free"}</span></span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 px-2 md:px-4 mb-6">
                    {/* Rules */}
                    <div className="flex-1 p-5 bg-white/5 rounded-2xl border border-white/10 h-fit hover:border-white/20 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                                <FileText size={20} />
                            </div>
                            <h4 className="text-white font-bold uppercase text-sm tracking-wider">Rules & Regulations</h4>
                        </div>
                        <ul className="text-gray-400 space-y-3">
                            {event.rules?.map((rule, i) => (
                                <li key={i} className="flex gap-3 text-sm group">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-500/50 group-hover:bg-pink-400 transition-colors flex-shrink-0" />
                                    <span className="group-hover:text-gray-300 transition-colors">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coordinators Section */}
                    <div className={`flex-1 bg-white/5 rounded-2xl border border-white/10 flex flex-col overflow-hidden h-fit transition-all duration-300 ${showCoordinators ? 'border-primary/30 bg-primary/5' : 'hover:border-white/20'}`}>
                        <div
                            className="p-5 flex items-center justify-between cursor-pointer group"
                            onClick={() => setShowCoordinators(!showCoordinators)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                                    <Users size={20} />
                                </div>
                                <h4 className="text-white font-bold uppercase text-sm tracking-wider group-hover:text-primary transition-colors">Event Coordinators</h4>
                            </div>
                            <button className="text-gray-400 group-hover:text-white transition-colors p-1 rounded-full group-hover:bg-white/10">
                                {showCoordinators ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                        </div>

                        {/* Collapsible Content */}
                        <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showCoordinators ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5 space-y-6">

                                    {event.facultyCoordinators && event.facultyCoordinators.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                                    Faculty
                                                </span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
                                            </div>
                                            <ul className="space-y-2">
                                                {event.facultyCoordinators.map((name, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm p-2 rounded-lg hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/5">
                                                        {/* <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-bold">
                                                            {name.charAt(0)}
                                                        </div> */}
                                                        {name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {event.studentCoordinators && event.studentCoordinators.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                                    Students
                                                </span>
                                                <div className="h-px flex-1 bg-gradient-to-r from-green-500/20 to-transparent" />
                                            </div>
                                            <ul className="space-y-2">
                                                {event.studentCoordinators.map((name, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-gray-300 text-sm p-2 rounded-lg hover:bg-white/5 transition-all cursor-default border border-transparent hover:border-white/5">
                                                        {/* <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-xs font-bold">
                                                            {name.charAt(0)}
                                                        </div> */}
                                                        {name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => setShowCoordinators(false)}
                                        className="w-full py-2 flex items-center justify-center gap-2 text-xs uppercase font-bold text-gray-500 hover:text-white transition-colors border-t border-white/5 mt-4 group"
                                    >
                                        <span>Show Less</span>
                                        <ChevronUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* fixed CTA */}
                <div className="sticky bottom-0 left-0 right-0 backdrop-blur-sm">

                    {/* Logistics Section - Simple Icons & Text Below */}
                    <div className=" py-4 border-t border-white/10">
                        <div className="flex flex-row">
                            {/* Venue */}
                            <div className="flex flex-col md:flex-row text-center flex-1 justify-center">
                                <span className="text-sm md:text-xl">📍</span>
                                <div>
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] md:text-[10px] tracking-wider">Venue</h4>
                                    <p className="text-white font-medium text-xs md:text-sm leading-tight">{event.venue || "TBA"}</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex flex-col md:flex-row text-center flex-1 justify-center">
                                <span className="text-sm md:text-xl">📅</span>
                                <div>
                                    <h4 className="text-gray-500 font-bold uppercase text-[10px] md:text-[10px] tracking-wider">Date</h4>
                                    <p className="text-white font-medium text-xs md:text-sm leading-tight">{event.date || "TBA"}</p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex flex-col md:flex-row text-center flex-1 justify-center">
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
