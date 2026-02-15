import React from 'react';
import { Shield, Code, Eye, AlertTriangle, UserCheck, School, Info } from 'lucide-react';

const Terms = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-black text-white relative overflow-hidden selection:bg-primary selection:text-white">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 hover:bg-white/10 transition-colors">
                        <Shield size={14} className="text-primary" /> Legal Notice
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                        Terms <span className="text-gray-700">&</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Disclaimer</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Please read the following terms regarding the nature of this project, its content, and its purpose.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Acknowledgement - Full Width */}
                    <div className="md:col-span-2 p-8 md:p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Code size={24} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4 text-white">Project Acknowledgement</h3>
                            <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                                By accessing this website, you acknowledge that it is a <span className="text-white font-medium">creative project</span> developed by <span className="text-white font-medium"><a href="https://github.com/srsoumyax11" target="_blank"> Soham</a></span> for educational and representational purposes. It is an experimental interface design exhibition.
                            </p>
                        </div>
                    </div>

                    {/* Aesthetic Intent */}
                    <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400 mb-4">
                            <Eye size={20} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">Aesthetic Intent</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The visual arrangement, positioning, and hierarchy of elements on this site are guided solely by <span className="text-gray-300">design aesthetics</span>. They do not represent any formal structure, official hierarchy, endorsement, or precedence.
                        </p>
                    </div>

                    {/* Liability Disclaimer */}
                    <div className="p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-6 text-red-400 mb-4">
                            <AlertTriangle size={20} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">Liability Disclaimer</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The creator assumes no responsibility for any misinterpretation, dissatisfaction, or consequences arising from the use of this website. All content is provided <span className="text-gray-300">"as is"</span> without warranties.
                        </p>
                    </div>

                    {/* User Responsibility */}
                    <div className="md:col-span-2 p-8 rounded-3xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <UserCheck size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-tight mb-2 text-white">User Responsibility</h3>
                            <p className="text-gray-400 leading-relaxed text-sm max-w-2xl">
                                You are solely responsible for how you interpret and use the information presented here. If you believe there is a misrepresentation of hierarchy or importance, please understand it is a result of design choices, not factual ordering.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Request to Authorities */}
                <div className="mb-20">
                    <div className="p-1 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent">
                        <div className="p-8 md:p-12 rounded-[22px] bg-black relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-40 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                                    <School size={32} className="text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <h3 className="text-2xl font-black uppercase tracking-tight text-white">Request to Authorities</h3>
                                        <div className="px-2 py-0.5 rounded bg-primary text-black text-[10px] font-bold uppercase tracking-wider">Note</div>
                                    </div>
                                    <p className="text-gray-400 leading-relaxed italic text-lg mb-6">
                                        "If you are a representative of an educational institution or any higher authority, you are respectfully requested to view this website in the context of a student's learning exercise. The creator intends no disrespect or misrepresentation and kindly asks for understanding regarding its experimental nature."
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
                                        <Info size={14} /> Demonstration Purpose Only
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center py-8 border-t border-white/5">
                    <p className="text-[10px] md:text-xs text-gray-600 uppercase tracking-[0.2em] font-bold">
                        Last Updated: 14 feb 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
