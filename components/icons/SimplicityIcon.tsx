import React from 'react';

const SimplicityIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3h7v7H3z" />
        <path d="M14 3h7v7h-7z" />
        <path d="M14 14h7v7h-7z" />
        <path d="M3 14h7v7H3z" />
        <path d="M10 7L3 14" />
        <path d="M21 7l-7 7" />
        <path d="M10 17l7-7" />
        <path d="M3 10l7 7" />
    </svg>
);

export default SimplicityIcon;