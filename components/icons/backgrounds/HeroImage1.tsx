import React from 'react';

const HeroImage1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="grad1-1" cx="20%" cy="30%" r="80%" fx="20%" fy="30%">
                <stop offset="0%" style={{ stopColor: 'rgba(79, 70, 229, 0.2)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(79, 70, 229, 0)', stopOpacity: 1 }} />
            </radialGradient>
            <radialGradient id="grad1-2" cx="80%" cy="70%" r="70%" fx="80%" fy="70%">
                <stop offset="0%" style={{ stopColor: 'rgba(129, 140, 248, 0.15)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgba(129, 140, 248, 0)', stopOpacity: 1 }} />
            </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="#0c1121" />
        <rect width="1920" height="1080" fill="url(#grad1-1)" />
        <rect width="1920" height="1080" fill="url(#grad1-2)" />
        <path d="M-100 540 Q 960 200 2020 540" stroke="rgba(165, 180, 252, 0.1)" strokeWidth="1" fill="none" />
        <path d="M-100 540 Q 960 880 2020 540" stroke="rgba(165, 180, 252, 0.1)" strokeWidth="1" fill="none" />
    </svg>
);

export default HeroImage1;
