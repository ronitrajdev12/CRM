import React from 'react';

const NetflixLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 110 30" fill="#E50914" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="0" y="25" fontFamily="Bebas Neue, sans-serif" fontSize="35" letterSpacing="-1" fill="currentColor">NETFLIX</text>
    </svg>
);

export default NetflixLogo;