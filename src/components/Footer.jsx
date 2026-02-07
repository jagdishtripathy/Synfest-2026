export default function Footer() {
    return (
        <footer className="py-12 border-t border-white/10 bg-[#050505] text-white">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">Synfest 2026</h2>
                    <p className="text-gray-500 text-sm">Synergy Institute of Engineering & Technology</p>
                </div>

                <div className="flex gap-6 text-sm text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-white transition-colors">Website</a>
                </div>

                <div className="text-xs text-gray-600 uppercase tracking-widest">
                    © 2026 SIET Dhenkanal
                </div>
            </div>
        </footer>
    );
}
