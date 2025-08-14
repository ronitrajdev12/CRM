
import React from 'react';

const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 14v-2" />
        <path d="M12 6a4 4 0 0 0-4 4c0 1.2.3 2.5 1 3h6c.7-.5 1-1.8 1-3a4 4 0 0 0-4-4Z" />
    </svg>
);

export default LightbulbIcon;