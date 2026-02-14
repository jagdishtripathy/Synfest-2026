import { useState, useEffect } from 'react';

const Countdown = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2026-03-12") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                m: Math.floor((difference / 1000 / 60) % 60),
                s: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-4 md:mx-8 relative group">
                {/* Number */}
                <span className="text-4xl md:text-7xl font-black text-white relative z-10 font-[Inter]">
                    {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                </span>

                {/* Label */}
                <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary mt-2">
                    {interval === 'd' ? 'Days' : interval === 'h' ? 'Hours' : interval === 'm' ? 'Mins' : 'Secs'}
                </span>

                {/* Subtle Glow */}
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            </div>
        );
    });

    return (
        <div className="flex justify-center flex-wrap mt-12 md:mt-16 select-none">
            {timerComponents.length ? (
                <div className="flex items-start">
                    {timerComponents.map((comp, i) => (
                        <div key={i} className="flex items-start">
                            {comp}
                            {/* Separator (except last) */}
                            {i < timerComponents.length - 1 && (
                                <span className="text-2xl md:text-4xl font-black text-zinc-700 mt-2 md:mt-4 mx-2">:</span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <span className="text-2xl font-black text-primary uppercase tracking-widest animate-pulse">
                    Event Started
                </span>
            )}
        </div>
    );
};

export default Countdown;
