import { Phone, Mail, MapPin } from 'lucide-react';
import { coordinators } from '../data/coordinators';

export default function Contact() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black text-white">
            <div className="container mx-auto max-w-5xl text-center">
                <span className="text-primary font-bold tracking-widest uppercase text-sm">Support</span>
                <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 mt-2">Get in Touch</h1>
                <p className="text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
                    For inquiries, sponsorship, or support, please reach out to our team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {coordinators.map((person) => (
                        <div key={person.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group">
                           <div className="mb-4">
                                <h3 className="text-xl font-bold text-white uppercase">{person.name}</h3>
                                <p className="text-primary text-sm font-bold tracking-wider uppercase">{person.role}</p>
                           </div>
                           
                           <div className="space-y-3">
                                <a href={`tel:${person.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Phone size={18} className="text-gray-500 group-hover:text-primary transition-colors" />
                                    <span>{person.phone}</span>
                                </a>
                                <a href={`mailto:${person.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                                    <Mail size={18} className="text-gray-500 group-hover:text-primary transition-colors" />
                                    <span className="truncate">{person.email}</span>
                                </a>
                           </div>
                        </div>
                    ))}
                    
                    {/* Location Card */}
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 md:col-span-2 lg:col-span-1 flex flex-col justify-center">
                         <div className="flex items-start gap-3">
                            <MapPin size={24} className="text-red-500 shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-bold text-white uppercase mb-2">Location</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Synergy Institute of Engineering & Technology,<br />
                                    Banamali Prasad, Dhenkanal,<br />
                                    Odisha - 759001
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
