import React from 'react';

const PipelineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 5l4 4h12l4-4"></path>
    <path d="M6 9v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9"></path>
    <path d="M12 19v-4"></path>
  </svg>
);

export default PipelineIcon;
