import React from 'react';

const BotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="7" y="12" width="10" height="8" rx="2" ry="2"></rect>
        <path d="M17 12V7a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v5"></path>
        <circle cx="10" cy="16" r="1"></circle>
        <circle cx="14" cy="16" r="1"></circle>
    </svg>
);

export default BotIcon;
