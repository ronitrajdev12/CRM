import React from 'react';

const WhyChooseUsBackground: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <pattern id="subtle-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(203, 213, 225, 0.2)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="soft-glow" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: 'rgba(255, 255, 255, 0.3)', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: 'rgba(255, 255, 255, 0)', stopOpacity: 1}} />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtle-grid)" />
        <rect width="100%" height="100%" fill="url(#soft-glow)" />
    </svg>
);

export default WhyChooseUsBackground;
