import React from 'react';

const NucleusResearchLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g stroke="currentColor" strokeWidth="2">
            {Array.from({ length: 12 }).map((_, i) => (
                <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + 45 * Math.cos(i * 2 * Math.PI / 12)}
                    y2={50 + 45 * Math.sin(i * 2 * Math.PI / 12)}
                />
            ))}
        </g>
        <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
    </svg>
);

export default NucleusResearchLogo;