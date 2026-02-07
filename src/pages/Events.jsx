import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { formalEvents, informalEvents, games } from '../data/events';
import EventModal from '../components/events/EventModal';

export default function Events() {
    const [activeTab, setActiveTab] = useState('formal');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const listRef = useRef(null);

    const categories = [
        { id: 'formal', label: 'Formal Events', data: formalEvents },
        { id: 'informal', label: 'Informal Events', data: informalEvents },
        { id: 'games', label: 'Games', data: games },
    ];

    const currentEvents = categories.find(c => c.id === activeTab)?.data || [];

    useEffect(() => {
        // Animate title on mount
        gsap.from(titleRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });
    }, []);

    useEffect(() => {
        // Animate list items when tab changes
        if (listRef.current) {
            gsap.fromTo(listRef.current.children,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.05,
                    ease: 'power2.out'
                }
            );
        }
    }, [activeTab]);

    return (
        <div ref={containerRef} className="min-h-screen pt-10 pb-20 px-6 md:px-12 bg-[#0a0a0a] text-white relative">

            {/* Back to Home Button */}
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 md:mb-12 group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="uppercase text-xs font-bold tracking-widest">Back to Home</span>
            </Link>

            <div className="container mx-auto">
                <h1 ref={titleRef} className="text-6xl md:text-8xl font-black mb-12 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                    The Events
                </h1>

                {/* Categories Navigation */}
                <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-6">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${activeTab === cat.id
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Event List */}
                <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="group relative p-8 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
                        >
                            {/* Decorative ID */}
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 text-8xl font-black transition-opacity pointer-events-none">
                                {event.id.replace(/\D/g, '')}
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors uppercase tracking-tight">
                                    {event.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary group-hover:text-white transition-colors">
                                    <span>View Details</span>
                                    <div className="h-px flex-grow bg-primary/30 group-hover:bg-white/30 transition-colors"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedEvent && (
                <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
}
