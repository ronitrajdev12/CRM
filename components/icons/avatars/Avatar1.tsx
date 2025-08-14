import React from 'react';

const Avatar1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="50" fill="#E0E7FF"/>
        <circle cx="50" cy="40" r="15" fill="#C7D2FE"/>
        <path d="M25 85 C 40 60, 60 60, 75 85" fill="#C7D2FE"/>
    </svg>
);

export default Avatar1;