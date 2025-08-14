import React from 'react';

const CapterraLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 150 30" xmlns="http://www.w3.org/2000/svg" {...props}>
    <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold" fill="#007DAF">Capterra</text>
    <path d="M25 5 L15 15 L25 25 L30 25 L20 15 L30 5 Z" fill="#FDB913"/>
    <path d="M5 5 L15 15 L5 25 L0 25 L10 15 L0 5 Z" fill="#007DAF"/>
  </svg>
);

export default CapterraLogo;