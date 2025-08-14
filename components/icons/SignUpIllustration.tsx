import React from 'react';

const SignUpIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <radialGradient id="signup-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(129, 140, 248, 0.3)" />
        <stop offset="100%" stopColor="rgba(55, 48, 163, 0)" />
      </radialGradient>
      <filter id="signup-filter-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="500" height="500" fill="url(#signup-glow)" />
    <g opacity="0.5" filter="url(#signup-filter-glow)">
      {/* Concentric circles */}
      <circle cx="250" cy="250" r="200" stroke="#4F46E5" strokeWidth="1" fill="none" strokeDasharray="5 10" />
      <circle cx="250" cy="250" r="150" stroke="#6366F1" strokeWidth="1" fill="none" />
      <circle cx="250" cy="250" r="100" stroke="#818CF8" strokeWidth="1" fill="none" strokeDasharray="10 5" />
      
      {/* Connecting lines */}
      <line x1="50" y1="250" x2="450" y2="250" stroke="#A5B4FC" strokeWidth="0.5" />
      <line x1="250" y1="50" x2="250" y2="450" stroke="#A5B4FC" strokeWidth="0.5" />
      <line x1="94" y1="94" x2="406" y2="406" stroke="#A5B4FC" strokeWidth="0.5" />
      <line x1="406" y1="94" x2="94" y2="406" stroke="#A5B4FC" strokeWidth="0.5" />
    </g>
    {/* Central glowing node */}
    <circle cx="250" cy="250" r="25" fill="#C7D2FE" />
    <circle cx="250" cy="250" r="10" fill="#4338CA" />
    
    {/* Peripheral nodes */}
    <circle cx="94" cy="94" r="10" fill="#818CF8" />
    <circle cx="406" cy="94" r="10" fill="#818CF8" />
    <circle cx="94" cy="406" r="10" fill="#818CF8" />
    <circle cx="406" cy="406" r="10" fill="#818CF8" />
    <circle cx="250" cy="50" r="10" fill="#6366F1" />
    <circle cx="50" cy="250" r="10" fill="#6366F1" />
    <circle cx="450" cy="250" r="10" fill="#6366F1" />
    <circle cx="250" cy="450" r="10" fill="#6366F1" />
  </svg>
);

export default SignUpIllustration;