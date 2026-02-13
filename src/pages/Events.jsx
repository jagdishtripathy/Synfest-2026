import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Phone, Search } from 'lucide-react';
import { formalEvents, informalEvents, games } from '../data/events';
import EventModal from '../components/events/EventModal';

export default function Events() {
    const [activeTab, setActiveTab] = useState('formal');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);

    const categories = [
        { id: 'formal', label: 'Formal', data: formalEvents },
        { id: 'informal', label: 'Informal', data: informalEvents },
        { id: 'games', label: 'Games', data: games },
    ];

    const allEvents = [...formalEvents, ...informalEvents, ...games];

    const currentEvents = searchQuery
        ? allEvents.filter(event =>
            event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : categories.find(c => c.id === activeTab)?.data || [];

    return (
        <div ref={containerRef} className="min-h-screen pt-10 pb-20 px-6 md:px-12 bg-[#0a0a0a] text-white relative">


            <div className="container mx-auto relative">
                <div className="absolute top-0 right-0 mt-10 md:mt-12 hidden md:block">
                    <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors group">
                        <Phone size={18} className="text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold uppercase tracking-wider">Need Help?</span>
                    </Link>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mt-10">
                    The<br /> Events <span className="text-primary">.</span>
                </h1>

                {/* Sticky Header: Search & Filter (Fade Down Blur) */}
                <div className="z-50 py-4 -mx-6 px-6 md:-mx-12 md:px-12 mb-4 transition-all bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        {/* Search Bar */}
                        <div className="w-full md:max-w-md relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search all events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-medium tracking-wide"
                            />
                        </div>

                        {/* Categories Navigation (Grid on mobile, Flex on desktop) */}
                        {!searchQuery && (
                            <div className="grid grid-cols-3 gap-2 w-full md:w-auto md:flex md:gap-4">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveTab(cat.id)}
                                        className={`w-full md:w-auto px-2 py-3 md:px-6 rounded-full text-[12px] md:text-sm font-bold uppercase tracking-wider transition-all duration-300 border truncate flex items-center justify-center ${activeTab === cat.id
                                            ? 'bg-white text-black border-white'
                                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Search Results Header */}
                {searchQuery && (
                    <div className="mb-8 flex items-center gap-2 text-gray-400">
                        <Search size={16} />
                        <span className="text-sm font-bold uppercase tracking-widest">
                            Found {currentEvents.length} result{currentEvents.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </span>
                    </div>
                )}

                {/* Event List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {currentEvents.map((event) => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="group relative h-64 border border-white/10 rounded-xl bg-[#0a0a0a] overflow-hidden cursor-pointer transition-transform duration-300"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={event.image || '/logo.png'}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                            </div>

                            {/* Slash Fade Overlay */}
                            <div
                                className="absolute inset-0 z-10"
                                style={{ background: 'linear-gradient(115deg, #0a0a0a 40%, rgba(10,10,10,0.9) 60%, rgba(10,10,10,0.4) 100%)' }}
                            ></div>

                            {/* Content */}
                            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
                                {/* Decorative ID - Moved to Left & Increased Visibility */}
                                <div className="absolute top-4 left-4 text-7xl font-black text-white/10 pointer-events-none select-none">
                                    {event.id.replace(/\D/g, '')}
                                </div>

                                <div className="relative z-10 pl-4 md:pl-8">
                                    <h3 className="text-3xl font-black mb-2 uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors drop-shadow-lg">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2 max-w-[80%] drop-shadow-md font-medium">
                                        {event.description}
                                    </p>

                                    <button className="mt-auto px-6 py-2 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white transition-colors self-start">
                                        Explore
                                    </button>
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
