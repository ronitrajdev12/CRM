import React from 'react';

const SuzukiLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 30" fill="#2d5da8" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="0" y="22" fontFamily="Impact, sans-serif" fontSize="30" letterSpacing="-1">SUZUKI</text>
  </svg>
);

export default SuzukiLogo;