
import React from 'react';

const BlogPostImage1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="blog1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4338CA" />
                <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <filter id="blog1Glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="15" result="blur" />
            </filter>
        </defs>
        <rect width="400" height="200" fill="url(#blog1Grad)" />
        <g opacity="0.2" filter="url(#blog1Glow)">
             <circle cx="50" cy="50" r="100" fill="#C7D2FE" />
             <circle cx="350" cy="150" r="80" fill="#A5B4FC" />
        </g>
        <path d="M-50 100 L 450 100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5, 10"/>
        <path d="M200 -50 L 200 250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5, 10"/>
    </svg>
);

export default BlogPostImage1;
