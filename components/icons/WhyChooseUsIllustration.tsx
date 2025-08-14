import React from 'react';

const WhyChooseUsIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(129, 140, 248)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        
        {/* <!-- Main structure lines --> */}
        <path d="M 50 150 Q 200 -50 350 150" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 50 150 Q 200 350 350 150" stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.5" />

        {/* <!-- Central node --> */}
        <circle cx="200" cy="150" r="30" fill="url(#grad1)" filter="url(#glow)" />
        <circle cx="200" cy="150" r="25" fill="white" />
        <circle cx="200" cy="150" r="10" fill="url(#grad1)" />

        {/* <!-- Peripheral nodes --> */}
        <circle cx="50" cy="150" r="15" fill="rgb(129, 140, 248)" />
        <circle cx="350" cy="150" r="15" fill="rgb(129, 140, 248)" />
        <circle cx="200" cy="40" r="12" fill="rgb(129, 140, 248, 0.8)" />
        <circle cx="200" cy="260" r="12" fill="rgb(129, 140, 248, 0.8)" />
        
        {/* <!-- Connecting lines --> */}
        <line x1="50" y1="150" x2="175" y2="150" stroke="rgb(129, 140, 248, 0.7)" strokeWidth="1.5" strokeDasharray="5, 5" />
        <line x1="350" y1="150" x2="225" y2="150" stroke="rgb(129, 140, 248, 0.7)" strokeWidth="1.5" strokeDasharray="5, 5" />
        <line x1="200" y1="40" x2="200" y2="125" stroke="rgb(129, 140, 248, 0.7)" strokeWidth="1.5" strokeDasharray="5, 5" />
        <line x1="200" y1="260" x2="200" y2="175" stroke="rgb(129, 140, 248, 0.7)" strokeWidth="1.5" strokeDasharray="5, 5" />
        
        {/* <!-- Decorative elements --> */}
        <circle cx="100" cy="80" r="5" fill="rgb(79, 70, 229, 0.6)" />
        <circle cx="300" cy="80" r="5" fill="rgb(79, 70, 229, 0.6)" />
        <circle cx="100" cy="220" r="5" fill="rgb(79, 70, 229, 0.6)" />
        <circle cx="300" cy="220" r="5" fill="rgb(79, 70, 229, 0.6)" />
    </svg>
);

export default WhyChooseUsIllustration;
