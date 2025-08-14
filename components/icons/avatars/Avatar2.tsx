import React from 'react';

const Avatar2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="50" fill="#DBEAFE"/>
        <circle cx="50" cy="40" r="15" fill="#BFDBFE"/>
        <path d="M30 90 Q 50 70 70 90" stroke="#BFDBFE" strokeWidth="10" fill="none" strokeLinecap="round"/>
    </svg>
);

export default Avatar2;