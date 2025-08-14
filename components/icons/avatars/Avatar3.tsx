import React from 'react';

const Avatar3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="50" cy="50" r="50" fill="#E5E7EB"/>
        <circle cx="50" cy="40" r="15" fill="#D1D5DB"/>
        <rect x="35" y="70" width="30" height="20" rx="10" fill="#D1D5DB"/>
    </svg>
);

export default Avatar3;