
import React from 'react';

const CaseStudyImage2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="cs2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#047857" />
                <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#cs2Grad)" />
        <g opacity="0.3">
            <circle cx="200" cy="112.5" r="100" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="5" />
            <circle cx="200" cy="112.5" r="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
            <circle cx="200" cy="112.5" r="50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="5" />
            <path d="M150,112.5 L250,112.5" stroke="white" strokeWidth="2" />
        </g>
    </svg>
);

export default CaseStudyImage2;
