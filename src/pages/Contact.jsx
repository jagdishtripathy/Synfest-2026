import { Phone, Mail, MapPin, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { coordinators, cse_volunteers, ee_volunteers, me_volunteers, ce_volunteers, bsc_nursing_volunteers, diploma_volunteers } from '../data/contact';

const VolunteerTable = ({ title, data }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!data || data.length === 0) return null;

    return (
        <div className="mb-6 border border-white/10 rounded-xl overflow-hidden bg-[#0a0a0a]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-xl font-bold uppercase tracking-wide text-white">
                        {title}
                        <span className="ml-3 text-xs md:text-sm font-normal text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                            {data.length} Members
                        </span>
                    </h3>
                </div>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </button>

            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10">
                                <th className="p-4 font-medium">Name</th>
                                <th className="p-4 font-medium">Role</th>
                                <th className="p-4 font-medium hidden md:table-cell">Year</th>
                                <th className="p-4 font-medium">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {data.map((person, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 text-white font-medium">{person.name}</td>
                                    <td className="p-4 text-gray-400 group-hover:text-primary transition-colors">{person.role}</td>
                                    <td className="p-4 text-gray-500 hidden md:table-cell">{person.year}</td>
                                    <td className="p-4 text-gray-400 font-mono text-xs md:text-sm">
                                        {person.phone ? (
                                            <a href={`tel:${person.phone}`} className="hover:text-white transition-colors flex items-center gap-2">
                                                <Phone size={12} /> {person.phone}
                                            </a>
                                        ) : (
                                            <span className="opacity-30">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default function Contact() {
    const departments = [
        { name: "Computer Science & Engineering", data: cse_volunteers },
        { name: "Electrical Engineering", data: ee_volunteers },
        { name: "Mechanical Engineering", data: me_volunteers },
        { name: "Civil Engineering", data: ce_volunteers },
        { name: "B.Sc Nursing", data: bsc_nursing_volunteers },
        { name: "Diploma Engineering", data: diploma_volunteers },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black text-white">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm">Support</span>
                    <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 mt-2">Get in Touch</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Meet the team behind Synfest 2026. Reach out to our student coordinators for any queries.
                    </p>
                </div>

                {/* Coordinators Grid */}
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 flex items-center gap-3">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    Core Team
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
                    {coordinators.map((person, index) => (
                        <div key={index} className="p-6 bg-[#0a0a0a] rounded-2xl border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all group duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white uppercase truncate">{person.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-primary border border-white/10">
                                        {person.role}
                                    </span>
                                    {person.branch && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/10">
                                            {person.branch}
                                        </span>
                                    )}
                                </div>

                                <a
                                    href={`tel:${person.phone}`}
                                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors mt-auto group/link"
                                >
                                    <div className="p-2 rounded-full bg-white/5 text-gray-400 group-hover/link:text-primary group-hover/link:bg-primary/20 transition-colors">
                                        <Phone size={14} />
                                    </div>
                                    <span className="text-sm font-medium">{person.phone}</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Volunteer Tables */}
                <div className="mb-24">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-8 flex items-center gap-3">
                        <span className="w-8 h-1 bg-white/20 rounded-full"></span>
                        Department Coordinators & Volunteers
                    </h2>

                    <div className="space-y-4">
                        {departments.map((dept, idx) => (
                            <VolunteerTable key={idx} title={dept.name} data={dept.data} />
                        ))}
                    </div>
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
                            className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale invert contrast-125 hover:grayscale-0 hover:invert-0 hover:contrast-100"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
