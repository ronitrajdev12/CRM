import React from 'react';
import { useInView } from './hooks/useInView';

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
    const { ref, isInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div 
            ref={ref} 
            className={`animate-on-scroll ${isInView ? 'is-visible' : ''} ${className || ''}`}
        >
            {children}
        </div>
    );
};

export default AnimatedSection;
