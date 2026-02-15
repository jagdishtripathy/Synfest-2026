import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { coordinators } from '../data/contact';

export default function Contact() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black text-white">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Support</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 mt-2">Get in Touch</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have questions? Reach out to our student coordinators or visit us at the campus for more information.
                    </p>
                </div>

                {/* Coordinators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                    {coordinators.map((person, index) => (
                        <div key={index} className="p-6 bg-[#0a0a0a] rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group duration-300">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-white uppercase truncate">{person.name}</h3>
                                <p className="text-primary text-[10px] font-bold tracking-widest uppercase mt-1">{person.role}</p>
                            </div>
                            <a
                                href={`tel:${person.phone}`}
                                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mt-4 group/link"
                            >
                                <div className="p-2 rounded-full bg-white/5 text-gray-400 group-hover/link:text-primary group-hover/link:bg-primary/20 transition-colors">
                                    <Phone size={14} />
                                </div>
                                <span className="text-sm font-medium">{person.phone}</span>
                            </a>
                        </div>
                    ))}
                </div>

                {/* Location Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                    {/* Address Card */}
                    <div className="lg:col-span-1 bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 flex flex-col justify-center h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />

                        <div className="relative z-10">
                            <div className="inline-flex p-3 rounded-xl bg-white/5 text-white mb-6 border border-white/10">
                                <MapPin size={24} />
                            </div>

                            <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">Visit Campus</h3>
                            <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                                Synergy Institute of Engineering & Technology,<br />
                                Banamali Prasad, NH 55,<br />
                                Dhenkanal, Odisha - 759001
                            </p>
                            <a
                                href="https://maps.google.com/maps?q=Synergy+Institute+of+Engineering+and+Technology+Dhenkanal"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs hover:text-white transition-colors border-b border-primary/30 pb-1 hover:border-white"
                            >
                                Get Directions <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* Map Embed */}
                    <div className="lg:col-span-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 relative group bg-[#111]">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d466.71848169034274!2d85.58280518507932!3d20.639132016362392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a191fff88a45791%3A0x6dd29378b91a27ea!2sSynergy%20Institute%20of%20Engineering%20and%20Technology%2C%20Dhenkanal!5e0!3m2!1sen!2sin!4v1771145560253!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Synergy Institute Location"
                            className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        ></iframe>
                        {/* Vignette Overlay */}
                        {/* <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10 rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
