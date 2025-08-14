import React, { useState, useEffect } from 'react';
import HeroImage1 from './icons/backgrounds/HeroImage1';
import HeroImage2 from './icons/backgrounds/HeroImage2';
import HeroImage3 from './icons/backgrounds/HeroImage3';

const images = [
    <HeroImage1 key="bg1" />,
    <HeroImage2 key="bg2" />,
    <HeroImage3 key="bg3" />,
];

const HeroBackgroundSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearTimeout(timer);
    }, [currentIndex]);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {images.map((ImageComponent, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {ImageComponent}
                </div>
            ))}
        </div>
    );
};

export default HeroBackgroundSlider;
