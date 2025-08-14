import React from 'react';

const ClapperboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 10h16v10H4z"/>
    <path d="m4 10 3-8h10l3 8"/>
    <path d="m10 4 1 2"/>
    <path d="m14 4 1 2"/>
  </svg>
);

export default ClapperboardIcon;