import { ExternalLink, ChevronDown, ChevronUp, GraduationCap, Award, Heart, BookOpen, FileText } from 'lucide-react';
import { useState } from 'react';
import { biriyaniLinks } from '../data/biriyani';

const getCategoryIcon = (title) => {
    switch (title.toLowerCase()) {
        case 'b.tech': return <GraduationCap className="text-primary" size={24} />;
        case 'diploma': return <Award className="text-primary" size={24} />;
        case 'nursing': return <Heart className="text-primary" size={24} />;
        case 'b.sc': return <BookOpen className="text-primary" size={24} />;
        default: return <FileText className="text-primary" size={24} />;
    }
};

const getFullBranchName = (abbr) => {
    const branchNames = {
        'cse': 'Computer Science',
        'me': 'Mechanical Engineering',
        'ce': 'Civil Engineering',
        'ee': 'Electrical Engineering',
        'mining': 'Mining Engineering',
        'phy': 'Physics',
        'chem': 'Chemistry',
        'math': 'Mathematics',
        'botny': 'Botany',
        'zoology': 'Zoology'
    };
    return branchNames[abbr.toLowerCase()] || abbr.toUpperCase();
};

const CategorySection = ({ title, data, isNested = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-8 border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 transition-colors text-left group"
            >
                <div className="flex items-center gap-4">
                    {getCategoryIcon(title)}
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
                            {title}
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">
                            {isNested ? `${Object.keys(data).length} branches` : `${Object.keys(data).length} years`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Forms</div>
                        <div className="text-lg font-bold text-primary">
                            {isNested ?
                                Object.values(data).reduce((acc, branch) => acc + Object.keys(branch).length, 0) :
                                Object.keys(data).length
                            }
                        </div>
                    </div>
                    {isOpen ? <ChevronUp className="text-gray-400" size={20} /> : <ChevronDown className="text-gray-400" size={20} />}
                </div>
            </button>

            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6">
                    {isNested ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Object.entries(data).map(([subKey, subData]) => (
                                <div key={subKey} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h4 className="text-lg font-bold text-white mb-3">{getFullBranchName(subKey)}</h4>
                                    <div className="space-y-2">
                                        {Object.entries(subData).map(([year, link]) => (
                                            <a
                                                key={year}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-3 bg-black/20 hover:bg-black/40 rounded border border-white/10 hover:border-white/20 transition-colors"
                                            >
                                                <span className="text-white font-medium">Year {year}</span>
                                                <ExternalLink size={14} className="text-gray-400" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(data).map(([year, link]) => (
                                <a
                                    key={year}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                                >
                                    <span className="text-white font-medium">Year {year}</span>
                                    <ExternalLink size={14} className="text-gray-400" />
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Biriyani() {
    const categories = [
        { name: "B.Tech", data: biriyaniLinks.btech, isNested: true },
        { name: "Diploma", data: biriyaniLinks.diploma, isNested: true },
        { name: "Nursing", data: biriyaniLinks.nursing, isNested: false },
        { name: "B.Sc", data: biriyaniLinks.bsc, isNested: false },
    ];

    const totalForms = categories.reduce((acc, cat) => {
        return acc + (cat.isNested ?
            Object.values(cat.data).reduce((subAcc, branch) => subAcc + Object.keys(branch).length, 0) :
            Object.keys(cat.data).length
        );
    }, 0);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-gradient-to-br from-black via-[#0a0a0a] to-black text-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                        <FileText className="text-primary" size={16} />
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">Registration Portal</span>
                    </div>
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <h1 className="text-6xl md:text-8xl font-black uppercase bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                            Biriyani Registration
                        </h1>
                    </div>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                        All students who want <span className="text-primary font-semibold">🥬 Veg / 🍗 Non-Veg Biriyani</span> during SynFest must fill the registration form.
                    </p>

                    {/* Date and Status */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
                        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl">
                            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary font-bold text-lg">📅 13 February 2026 (Friday) 🎓</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-gray-400">📋 {totalForms} Active Forms</span>
                        </div>
                    </div>
                </div>

                {/* Important Instructions */}
                <div className="mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 max-w-3xl mx-auto">
                        <h2 className="text-lg font-bold text-white mb-3">
                            Important Instructions
                        </h2>
                        <div className="text-gray-300 text-sm space-y-2">
                            <div>• Fill the form <strong className="text-white">only once</strong></div>
                            <div>• Select your <strong className="text-white">food preference carefully</strong></div>
                            <div>• <strong className="text-white">Bring your College ID Card</strong> while collecting the biriyani</div>
                            <div>• ❗No Registration = No Biriyani</div>
                            <div>• ❗No ID Card = No Biriyani</div>
                        </div>
                    </div>
                </div>

                {/* Registration Call to Action */}
                <div className="text-center mb-12">
                    <p className="text-lg text-gray-300 mb-4">
                        Fill the form according to your course:
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full">
                        <span className="text-primary font-bold">⏳</span>
                        <span className="text-primary font-semibold">Please complete the registration before the deadline</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                    {categories.map((category, idx) => (
                        <CategorySection
                            key={idx}
                            title={category.name}
                            data={category.data}
                            isNested={category.isNested}
                        />
                    ))}
                </div>

                {/* Footer note */}
                <div className="text-center mt-16 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400 text-sm">
                        All forms open in new tabs. Make sure to fill them completely for successful registration.
                    </p>
                </div>
            </div>
        </div>
    );
}