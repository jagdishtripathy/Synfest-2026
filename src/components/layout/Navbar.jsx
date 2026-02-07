import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    const linksRef = useRef([]);
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (isOpen) {
                // Show Backdrop
                gsap.to(backdropRef.current, {
                    display: 'block',
                    opacity: 1,
                    duration: 0.3
                });

                // Slide Menu Down
                gsap.to(menuRef.current, {
                    y: '0%',
                    duration: 0.5,
                    ease: 'power3.out',
                });

                // Animate Links
                gsap.fromTo(linksRef.current,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
                );
            } else {
                // Slide Menu Up
                gsap.to(menuRef.current, {
                    y: '-100%',
                    duration: 0.5,
                    ease: 'power3.in',
                });

                // Hide Backdrop
                gsap.to(backdropRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => gsap.set(backdropRef.current, { display: 'none' })
                });
            }
        });
        return () => ctx.revert();
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/#about' },
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
            }
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm md:backdrop-blur-none text-white">
                {/* Logo */}
                <Link to="/" className="text-2xl font-black tracking-tighter uppercase z-50 relative drop-shadow-md">
                    Synfest<span className="text-primary">.</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 items-center bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => scrollToSection(e, link.path)}
                            className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors cursor-pointer"
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
                <button onClick={toggleMenu} className="md:hidden z-50 relative w-8 h-8 flex items-center justify-center">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Backdrop for Outside Click */}
            <div
                ref={backdropRef}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 hidden opacity-0 transition-opacity"
            ></div>

            {/* Mobile Menu Panel (Slides from Top) */}
            <div
                ref={menuRef}
                className="fixed top-0 left-0 w-full bg-black/95 border-b border-white/10 z-40 flex flex-col items-center pt-24 pb-12 -translate-y-full md:hidden shadow-2xl"
            >
                <div className="flex flex-col gap-8 text-center w-full">
                    {navLinks.map((link, index) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={(e) => scrollToSection(e, link.path)}
                            ref={el => linksRef.current[index] = el}
                            className="text-3xl font-black uppercase tracking-tighter hover:text-primary transition-colors text-white block w-full py-2"
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
