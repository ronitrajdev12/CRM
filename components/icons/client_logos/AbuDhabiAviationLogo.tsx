import React from 'react';

const AbuDhabiAviationLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 140 45" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="black">
      <text x="0" y="32" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold">AbuDhabi</text>
      <text x="58" y="32" fontFamily="Arial, sans-serif" fontSize="10">AVIATION</text>
    </g>
    <g fill="#d40000">
      <path d="M0 15 Q 35 2, 70 15" stroke="#d40000" strokeWidth="2" fill="none" />
      <path d="M5 18 Q 37.5 7, 70 18" stroke="#d40000" strokeWidth="2" fill="none" />
      <path d="M10 21 Q 40 12, 70 21" stroke="#d40000" strokeWidth="2" fill="none" />
    </g>
    <g fill="black">
      <text x="75" y="15" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">أبوظبي للطيران</text>
    </g>
  </svg>
);

export default AbuDhabiAviationLogo;