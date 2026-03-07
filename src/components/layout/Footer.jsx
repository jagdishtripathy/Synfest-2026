import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, MapPin, Phone, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-block group">
                            <h2 className="text-6xl leading-none tracking-tighter mb-6 font-black">
                                SYNFEST <span className="text-primary">.</span>
                            </h2>
                        </Link>
                        <p className="text-gray-400 max-w-md text-lg leading-relaxed">
                            The annual techno-cultural fest of Synergy Institute of Engineering & Technology. Where innovation meets tradition.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">Explore</h3>
                        <ul className="space-y-4">
                            <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">All Events</Link></li>
                            <li><a href="/#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            {/* <li><a href="/#sponsors" className="text-gray-400 hover:text-white transition-colors">Sponsors</a></li> */}
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Team</Link></li>
                            <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Use</Link></li>
                            {/* <li><Link to="/biriyani" className="text-gray-400 hover:text-white transition-colors">Biriyani Links</Link></li> */}
                        </ul>
                    </div>
                    {/* Remove Biriyani links */}

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 text-gray-400">
                                <MapPin size={20} className="shrink-0 mt-1" />
                                <span>Synergy Institute,<br />Dhenkanal, Odisha 759001</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Mail size={20} className="shrink-0" />
                                <a href="mailto:sietdkl@synergyinstitute.net" className="hover:text-white">sietdkl@synergyinstitute.net</a>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Phone size={20} className="shrink-0" />
                                <span>+91 67622 25905</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-gray-500 text-sm">
                            &copy; {currentYear} Synfest. All rights reserved.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/srsoumyax11"
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                            Made with <span className="text-red-500 animate-pulse">☕</span> by Soham
                        </a>
                    </div>

                    <div className="flex gap-6">
                        <a href="https://www.instagram.com/synergygroupofinstitutions/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Instagram size={24} /></a>
                        <a href="https://www.linkedin.com/school/synergy-institute-of-engineering-and-technology-siet-dhenkanal/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Linkedin size={24} /></a>
                        <a href="https://www.facebook.com/synergygroupofinstitutions" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Facebook size={24} /></a>
                        <a href="https://www.youtube.com/youtube.com/synergydhenkanal" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-primary transition-colors"><Youtube size={24} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
