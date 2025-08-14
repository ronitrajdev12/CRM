import React from 'react';
import RaintreeLogo from './icons/client_logos/RaintreeLogo';
import AbuDhabiAviationLogo from './icons/client_logos/AbuDhabiAviationLogo';
import SuzukiLogo from './icons/client_logos/SuzukiLogo';
import HotstarLogo from './icons/client_logos/HotstarLogo';
import IiflLogo from './icons/client_logos/IiflLogo';
import NetflixLogo from './icons/client_logos/NetflixLogo';
import PropertyGuysLogo from './icons/client_logos/PropertyGuysLogo';
import OlaLogo from './icons/client_logos/OlaLogo';
import CtrlSLogo from './icons/client_logos/CtrlSLogo';

const logos = [
    { component: <RaintreeLogo className="h-10 w-auto" />, name: 'Raintree' },
    { component: <AbuDhabiAviationLogo className="h-12 w-auto" />, name: 'Abu Dhabi Aviation' },
    { component: <SuzukiLogo className="h-8 w-auto" />, name: 'Suzuki' },
    { component: <HotstarLogo className="h-8 w-auto" />, name: 'Hotstar' },
    { component: <IiflLogo className="h-10 w-auto" />, name: 'IIFL' },
    { component: <NetflixLogo className="h-7 w-auto" />, name: 'Netflix' },
    { component: <PropertyGuysLogo className="h-10 w-auto" />, name: 'Property Guys' },
    { component: <OlaLogo className="h-8 w-auto" />, name: 'Ola' },
    { component: <CtrlSLogo className="h-8 w-auto" />, name: 'CtrlS' },
];

const Clients: React.FC = () => (
    <section className="bg-slate-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
                {logos.map((logo) => (
                    <div 
                        key={logo.name} 
                        className="bg-white rounded-2xl shadow-lg p-6 flex justify-center items-center h-32 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                        title={logo.name}
                    >
                        {logo.component}
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Clients;