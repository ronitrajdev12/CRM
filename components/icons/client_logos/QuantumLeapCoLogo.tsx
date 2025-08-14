
import React from 'react';

const QuantumLeapCoLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="0" y="30" fontFamily="Garamond, serif" fontSize="28" fontWeight="600" fill="currentColor" letterSpacing="1">
      QuantumLeap Co
    </text>
    <path d="M200 30 Q 220 10 240 30" stroke="#818CF8" strokeWidth="2" fill="none" />
  </svg>
);

export default QuantumLeapCoLogo;
