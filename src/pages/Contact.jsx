export default function Contact() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
            <div className="text-center max-w-2xl">
                <h1 className="text-5xl font-black uppercase mb-8">Get in Touch</h1>
                <p className="text-gray-400 text-lg mb-12">
                    For inquiries, sponsorship, or support, please reach out to our team.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h3 className="text-purple-400 font-bold uppercase mb-2">General Queries</h3>
                        <p className="text-white">info@synfest.com</p>
                        <p className="text-white">+91 98765 43210</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h3 className="text-blue-400 font-bold uppercase mb-2">Location</h3>
                        <p className="text-gray-400">
                            Synergy Institute of Engineering & Technology,
                            Banamali Prasad, Dhenkanal,
                            Odisha - 759001
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
