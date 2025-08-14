import React from 'react';

const GrowthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2 22h20" />
        <path d="M12 22V6" />
        <path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M12 6a4 4 0 0 1 4 4" />
    </svg>
);

export default GrowthIcon;