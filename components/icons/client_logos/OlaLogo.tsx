import React from 'react';

const OlaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(5,5)">
      <circle cx="15" cy="15" r="12" stroke="black" strokeWidth="2" fill="none"/>
      <circle cx="15" cy="15" r="14" stroke="black" strokeWidth="1" fill="none" strokeDasharray="2 3"/>
      <circle cx="15" cy="15" r="5" fill="#cddc39"/>
    </g>
    <text x="40" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="black">OLA</text>
  </svg>
);

export default OlaLogo;