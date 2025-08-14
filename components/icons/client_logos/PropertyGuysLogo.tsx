import React from 'react';

const PropertyGuysLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(5, 5)">
        <circle cx="20" cy="20" r="20" fill="#8dc63f"/>
        <path d="M 35 20 A 15 15, 0, 0, 0, 5 20 L 5 35 L 35 35 Z" fill="#0072bc"/>
        <path d="M 2 18 L 20 5 L 38 18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="10" y="22" width="5" height="10" fill="white"/>
        <rect x="25" y="22" width="5" height="5" fill="white"/>
    </g>
    <text x="50" y="32" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="#0072bc">PropertyGuys</text>
    <text x="175" y="20" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#0072bc">.com</text>
  </svg>
);

export default PropertyGuysLogo;