import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                x: '0%',
                duration: 0.5,
                ease: 'power3.out',
            });
            gsap.fromTo(linksRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
            );
        } else {
            gsap.to(menuRef.current, {
                x: '100%',
                duration: 0.5,
                ease: 'power3.in',
            });
        }
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' }, // Handle hash scroll manually if needed
        { name: 'Highlights', path: '/#highlights' },
        { name: 'Sponsors', path: '/#sponsors' },
        { name: 'Contact', path: '/contact' },
    ];

    const scrollToSection = (e, path) => {
        if (path.startsWith('/#')) {
            const id = path.split('#')[1];
            const element = document.getElementById(id);
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            } else if (location.pathname !== '/') {
                // Allow default navigation to Home, then scroll (handled by useEffect in Home usually)
            }
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white">
                {/* Logo */}
                <Link to="/" className="text-2xl font-black tracking-tighter uppercase z-50 relative">
                    Synfest<span className="text-primary">.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => scrollToSection(e, link.path)}
                            className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Desktop CTA */}
                <Link
                    to="/events"
                    className="hidden md:block px-6 py-3 bg-primary text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1"
                >
                    Events
                </Link>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMenu} className="md:hidden z-50 relative">
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </nav>

            {/* Mobile Fullscreen Menu */}
            <div
                ref={menuRef}
                className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center translate-x-full md:hidden"
            >
                <div className="flex flex-col gap-8 text-center">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => scrollToSection(e, link.path)}
                            ref={el => linksRef.current[index] = el}
                            className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div ref={el => linksRef.current[navLinks.length] = el}>
                        <Link
                            to="/events"
                            className="inline-block mt-4 px-8 py-4 bg-primary text-white font-bold uppercase tracking-widest text-lg"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
