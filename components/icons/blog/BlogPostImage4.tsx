
import React from 'react';

const BlogPostImage4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
             <linearGradient id="blog4Grad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#BE185D" />
                <stop offset="100%" stopColor="#9D174D" />
            </linearGradient>
            <pattern id="blog4Pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 10 20 M 0 10 L 20 10" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#blog4Grad)" />
        <rect width="400" height="200" fill="url(#blog4Pattern)" />
    </svg>
);

export default BlogPostImage4;
