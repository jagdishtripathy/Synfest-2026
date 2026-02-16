import { useEffect, useRef, useState } from 'react';

const images = [
    '/media/1.webp',
    '/media/2.webp',
    '/media/3.webp',
    '/media/4.webp',
    '/media/5.webp',
    '/media/6.webp',
    '/media/7.webp',
    '/media/8.webp',
    '/media/9.webp',
    '/media/10.webp',
    '/media/11.webp',
    '/media/12.webp',
    '/media/13.webp',
    '/media/14.webp',
    '/media/15.webp',
    '/media/16.webp',
    '/media/17.webp',
    '/media/18.webp',
    '/media/19.webp',
    // '20.webp',
    // '21.webp',
    // '22.webp',
    // '23.webp',
    // '24.webp',
    // '25.webp',
    // '26.webp',
    // '27.webp',
    // '28.webp',
    // '29.webp',
    // '30.webp',
    // '31.webp',
    // '32.webp',
    // '33.webp',
    // '34.webp',
    // '35.webp',
    // '36.webp',
    // '37.webp',
    // '38.webp',
    // '39.webp',
    // '40.webp',
    // '41.webp',
    // '42.webp',
    // '43.webp',
    // '44.webp',
    // '45.webp',
    // '46.webp',
    // '47.webp',
    // '48.webp',
    // '49.webp',
    // '50.webp',
    // '51.webp',
    // '52.webp',
    // '53.webp',
    // '54.webp',
    // '55.webp',
    // '56.webp',
    // '57.webp',
    // '58.webp',
    // '59.webp',
    // '60.webp',
    // '61.webp',
    // '62.webp',
    // '63.webp',
    // '64.webp',
    // '65.webp',
    // '66.webp',
    // '67.webp',
    // '68.webp',
    // '69.webp',
    // '70.webp',
    // '71.webp',
    // '72.webp',
    // '73.webp',
    // '74.webp',
    // '75.webp',
    // '76.webp',
    // '77.webp',
    // '78.webp',
    // '79.webp',
    // '80.webp',
    // '81.webp',
    // '82.webp',
    // '83.webp',
    // '84.webp',
    // '85.webp',
    // '86.webp',
    // '87.webp',
    // '88.webp',
    // '89.webp',
    // '90.webp',
    // '91.webp',
    // '92.webp',
    // '93.webp',
    // '94.webp',
    // '95.webp',
    // '96.webp',
    // '97.webp',
    // '98.webp',
    // '99.webp',
    // '100.webp'
];

// Helper to shuffle array
const shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export default function Showcase() {
    // Generate random sets for each row
    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);
    const [row3, setRow3] = useState([]);

    useEffect(() => {
        setRow1([...shuffle(images), ...shuffle(images)]);
        setRow2([...shuffle(images), ...shuffle(images)]);
        setRow3([...shuffle(images), ...shuffle(images)]);
    }, []);

    return (
        <section id="highlights" className="py-20 overflow-hidden flex flex-col justify-center relative">
            <div className=" mx-auto px-6 mb-12 text-center relative z-10">
                <h2 className="text-[18vw] tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-500 font-frakturika">
                    Highlights
                </h2>
                <p className="text-gray-400 mt-4 max-w-lg mx-auto">
                    Glimpses of the energy, the layout, and the chaos.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="flex flex-col gap-3 md:gap-6 rotate-[-2deg] scale-110">
                {/* Row 1 - Fast Left */}
                <MarqueeRow images={row1} speed="40s" />

                {/* Row 2 - Slow Right */}
                <MarqueeRow images={row2} speed="50s" reverse />

                {/* Row 3 - Medium Left */}
                <MarqueeRow images={row3} speed="45s" />
            </div>

            {/* Gradient Overlay for Fade Effect */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none z-10"></div> */}
            {/* <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10"></div> */}
            {/* <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10"></div> */}

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll linear infinite;
                }
                .reverse {
                    animation-direction: reverse;
                }
            `}</style>
        </section>
    );
}

function MarqueeRow({ images, speed, reverse }) {
    return (
        <div className="flex gap-3 md:gap-6 w-[200%] animate-scroll" style={{ animationDuration: speed, animationDirection: reverse ? 'reverse' : 'normal' }}>
            {images.map((src, i) => (
                <div key={i} className={`relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors duration-500
                    ${i % 2 === 0 ? 'w-40 md:w-64 h-28 md:h-48' : 'w-48 md:w-80 h-28 md:h-48'} 
                    ${i % 3 === 0 ? 'w-32 md:w-56 h-28 md:h-48' : ''}
                `}>
                    <img src={src} alt="Gallery" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
}
