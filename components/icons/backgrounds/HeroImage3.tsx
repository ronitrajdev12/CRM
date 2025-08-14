import React from 'react';

const HeroImage3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <filter id="glow-3">
                <feGaussianBlur stdDeviation="25" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <rect width="1920" height="1080" fill="#0c1121" />
        <circle cx="400" cy="300" r="400" fill="rgba(79, 70, 229, 0.15)" filter="url(#glow-3)" />
        <circle cx="1500" cy="800" r="350" fill="rgba(129, 140, 248, 0.1)" filter="url(#glow-3)" />
    </svg>
);

export default HeroImage3;
