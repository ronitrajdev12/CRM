import React from 'react';

const ConversionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 21v-4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"></path>
        <path d="M12 15V3"></path>
        <polyline points="9 6 12 3 15 6"></polyline>
    </svg>
);

export default ConversionIcon;