import React from 'react';
import WhyChooseUsIllustration from './icons/WhyChooseUsIllustration';
import OmnichannelIcon from './icons/OmnichannelIcon';
import PipelineIcon from './icons/PipelineIcon';
import HeadsetIcon from './icons/HeadsetIcon';
import WhyChooseUsBackground from './icons/WhyChooseUsBackground';

const WhyChooseUs: React.FC = () => {
    return (
        <section className="relative py-20 sm:py-28 bg-slate-50 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <WhyChooseUsBackground />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
                    {/* Left Column: Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Why Choose Aetherium CRM?</h2>
                        
                        <p className="text-lg text-slate-600">
                           Aetherium CRM isn’t just another customer relationship tool—it’s a complete AI-powered business management platform designed to centralize, simplify, and supercharge your operations.
                        </p>

                        <ul className="space-y-4 pt-2">
                           <li className="flex items-start">
                                <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                                    <OmnichannelIcon className="h-5 w-5" />
                                </div>
                                <p className="ml-4 text-slate-700">
                                    <span className="font-semibold">Unified System:</span> Bring omnichannel communication, intelligent pipeline tracking, hospitality solutions, and Excel integration together.
                                </p>
                           </li>
                           <li className="flex items-start">
                                <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                                    <PipelineIcon className="h-5 w-5" />
                                </div>
                                <p className="ml-4 text-slate-700">
                                    <span className="font-semibold">Built for Performance:</span> From inventory management to AI call analysis, every feature is designed for accuracy and ease of use.
                                </p>
                           </li>
                           <li className="flex items-start">
                                <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-full h-8 w-8 flex items-center justify-center mt-1">
                                    <HeadsetIcon className="h-5 w-5" />
                                </div>
                                <p className="ml-4 text-slate-700">
                                    <span className="font-semibold">Expert Support:</span> Get hands-on access with a free trial, backed by 24x5 standard and 24x7 premium support to ensure your success.
                                </p>
                           </li>
                        </ul>
                        
                        <p className="font-semibold text-indigo-600 text-lg pt-4">
                            Aetherium CRM – Where AI meets real business results.
                        </p>
                    </div>

                    {/* Right Column: Illustration */}
                    <div className="hidden lg:flex justify-center">
                        <WhyChooseUsIllustration className="w-full h-auto max-w-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;