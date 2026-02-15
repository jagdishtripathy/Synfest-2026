import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import MuteToggle from '../ui/MuteToggle';

export default function Navbar() {
    return (
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm text-white">
                {/* Logo */}
                <Link to="/" className="text-2xl font-black tracking-tighter uppercase z-50 relative drop-shadow-md">
                    Synfest<span className="text-primary">.</span>
                </Link>
                {/* <div className="flex items-center gap-4">
                    <MuteToggle />
                </div> */}
            </nav>
    );
}
