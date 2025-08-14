
import React from 'react';

const BlogPostImage3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <radialGradient id="blog3Grad">
                <stop offset="0%" stopColor="#065F46" />
                <stop offset="100%" stopColor="#064E3B" />
            </radialGradient>
        </defs>
        <rect width="400" height="200" fill="url(#blog3Grad)" />
        <g fill="rgba(255,255,255,0.05)">
            {Array.from({length: 10}).map((_, i) => (
                 <circle key={i} cx={Math.random()*400} cy={Math.random()*200} r={Math.random()*50 + 10} />
            ))}
        </g>
    </svg>
);

export default BlogPostImage3;
