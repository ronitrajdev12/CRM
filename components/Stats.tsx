import React, { useState, useEffect, useRef } from 'react';
import GlobeIcon from './icons/GlobeIcon';
import SearchIcon from './icons/SearchIcon';
import BellIcon from './icons/BellIcon';
import ConversionIcon from './icons/ConversionIcon';
import SmartphoneIcon from './icons/SmartphoneIcon';
import { useInView } from './hooks/useInView';

const benefits = [
    { icon: <GlobeIcon className="h-7 w-7 text-yellow-300" />, text: "Get a 360 degree view of your business." },
    { icon: <SearchIcon className="h-7 w-7 text-yellow-300" />, text: "Track important sales and marketing opportunities." },
    { icon: <BellIcon className="h-7 w-7 text-yellow-300" />, text: "Quickly see your next-best actions." },
    { icon: <ConversionIcon className="h-7 w-7 text-yellow-300" />, text: "Increase your lead-to-deal conversion rates." },
    { icon: <SmartphoneIcon className="h-7 w-7 text-yellow-300" />, text: "Take your business with you, on your time." },
];

const statsData = [
    { value: 300, text: "Improvement in lead conversion rates.", suffix: "%" },
    { value: 41, text: "Revenue increase per sales person.", suffix: "%" },
    { value: 27, text: "Improvement in customer retention.", suffix: "%" },
    { value: 24, text: "Shorter sales cycles.", suffix: "%" },
    { value: 23, text: "Decreased sales and marketing costs.", suffix: "%" },
];

const CountUp: React.FC<{ end: number, duration?: number, suffix?: string, isVisible: boolean }> = ({ end, duration = 1500, suffix = '', isVisible }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isVisible) return;
        
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const currentCount = Math.floor(progress * end);
            setCount(currentCount);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                 setCount(end);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [end, duration, isVisible]);

    return <>{count.toLocaleString()}{suffix}</>;
};

const Stats: React.FC = () => {
    const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: true });

    return (
        <section ref={ref} className="bg-indigo-900 text-white" style={{ backgroundImage: `radial-gradient(circle at top right, rgb(29 78 216 / 0.3), transparent), radial-gradient(circle at bottom left, rgb(109 40 217 / 0.3), transparent)` }}>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
                 <div className="text-center">
                    <h2 className="text-4xl font-bold mb-16">Here's how CRM can help you</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Benefits List */}
                    <div className="space-y-6">
                        {benefits.map((benefit, index) => (
                             <div key={index} className="flex items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex-shrink-0 bg-yellow-400/10 rounded-full p-3">
                                    {benefit.icon}
                                </div>
                                <p className="ml-5 text-lg font-semibold">{benefit.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                       {statsData.map((stat, index) => (
                           <div key={index} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
                               <p className="text-5xl font-bold text-yellow-300">
                                   <CountUp end={stat.value} suffix={stat.suffix} isVisible={isInView} />
                               </p>
                               <p className="mt-2 text-lg text-indigo-200">{stat.text}</p>
                           </div>
                       ))}
                       <div className="sm:col-span-2 text-right text-xs text-indigo-300/70 mt-4">
                           * Growth metrics reported by our customers in an internal survey.
                       </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Stats;