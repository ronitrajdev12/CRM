import React from 'react';

const CtrlSLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <pattern id="dots-pattern" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.7" fill="black"/>
            </pattern>
        </defs>
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="black">Ctrl</text>
        <text x="45" y="22" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="url(#dots-pattern)">S</text>
        <text x="45" y="22" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#8dc63f" opacity="0.9">S</text>
    </svg>
);

export default CtrlSLogo;