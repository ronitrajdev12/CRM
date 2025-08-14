
import React from 'react';

const Avatar4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="50" fill="#EEF2FF"/>
        <circle cx="50" cy="40" r="15" fill="#C7D2FE"/>
        <path d="M30 90 C 40 70, 60 70, 70 90 L 70 95 L 30 95 Z" fill="#C7D2FE"/>
    </svg>
);

export default Avatar4;
