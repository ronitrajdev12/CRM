import React from 'react';
import NucleusResearchLogo from './icons/NucleusResearchLogo';
import CapterraLogo from './icons/CapterraLogo';
import StarIcon from './icons/StarIcon';

const Testimonials: React.FC = () => (
    <section className="bg-slate-50 py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Nucleus Research */}
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                    <div className="flex-shrink-0">
                         <NucleusResearchLogo className="h-32 w-32 md:h-40 md:w-40 text-red-500" />
                    </div>
                    <div className="sm:ml-8 mt-6 sm:mt-0">
                        <h3 className="text-xl font-bold text-slate-800">Leader - CRM Technology Value Matrix 2024</h3>
                        <p className="mt-3 text-slate-600">
                            Nucleus Research has named us a leader in the CRM Technology space, recognizing our ability to drive long term value for businesses.
                        </p>
                    </div>
                </div>

                {/* Capterra */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left border-t pt-10 md:border-t-0 md:pt-0 md:border-l md:pl-12 border-slate-200">
                     <h3 className="text-xl font-bold text-slate-800 mb-4">Highly rated CRM software by customers</h3>
                    <CapterraLogo className="h-10"/>
                    <div className="flex items-center mt-4">
                        <StarIcon className="h-6 w-6 text-yellow-400" filled />
                        <StarIcon className="h-6 w-6 text-yellow-400" filled />
                        <StarIcon className="h-6 w-6 text-yellow-400" filled />
                        <StarIcon className="h-6 w-6 text-yellow-400" filled />
                        <StarIcon className="h-6 w-6 text-yellow-400" /> 
                        <span className="ml-3 text-lg font-semibold text-slate-700">4.3 out of 5</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
export default Testimonials;