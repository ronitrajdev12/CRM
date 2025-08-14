
import React from 'react';

const CaseStudyImage1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="cs1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
        </defs>
        <rect width="400" height="225" fill="url(#cs1Grad)" />
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="2">
            <polyline points="20,180 80,120 140,160 200,100 260,140 320,80 380,120" fill="none" />
             <polyline points="160,40 200,70 240,40" strokeWidth="4" strokeLinecap="round" fill="none" stroke="rgba(165, 180, 252, 0.5)"/>
        </g>
    </svg>
);

export default CaseStudyImage1;
