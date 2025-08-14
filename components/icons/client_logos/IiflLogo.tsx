import React from 'react';

const IiflLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0, 5)">
      <defs>
        <path id="iifl-shape" d="M16 0L12 8L8 0L4 8L0 0L8 16L16 0Z"/>
      </defs>
      <g fill="#f37021">
          <use href="#iifl-shape" x="8" y="0"/>
          <use href="#iifl-shape" x="0" y="8"/>
          <use href="#iifl-shape" x="16" y="8"/>
      </g>
      <g fill="#00599c" transform="translate(8, 16) rotate(180)">
          <use href="#iifl-shape" x="0" y="-8"/>
          <use href="#iifl-shape" x="-8" y="0"/>
          <use href="#iifl-shape" x="8" y="0"/>
      </g>
    </g>
    <text x="40" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#00599c">IIFL</text>
  </svg>
);

export default IiflLogo;