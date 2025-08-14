
import React from 'react';

const BlogPostImage2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="blog2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3730A3" />
                <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#blog2Grad)" />
        <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
            <path d="M 0 0 L 400 200" />
            <path d="M 400 0 L 0 200" />
            <path d="M 200 0 L 200 200" />
            <path d="M 0 100 L 400 100" />
        </g>
    </svg>
);

export default BlogPostImage2;
