import React from 'react';

const HeroImage2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="grad2-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(30, 64, 175, 0.3)" />
                <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
            </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="#0c1121" />
        <rect width="1920" height="1080" fill="url(#grad2-1)" />
        {/* Abstract grid */}
        <g stroke="rgba(129, 140, 248, 0.1)" strokeWidth="0.5">
            {Array.from({length: 40}).map((_, i) => <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="1080" />)}
            {Array.from({length: 30}).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 36} x2="1920" y2={i * 36} />)}
        </g>
    </svg>
);
export default HeroImage2;
