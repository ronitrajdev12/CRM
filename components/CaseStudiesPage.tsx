import React from 'react';
import { caseStudies } from '../data/caseStudies';
import MainLayout from './MainLayout';
import ArrowRightIcon from './icons/ArrowRightIcon';

const CaseStudiesPage: React.FC = () => {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="bg-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        Customer <span className="text-indigo-600">Success Stories</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 leading-8">
                        See how businesses just like yours are leveraging Aetherium CRM to drive growth, improve efficiency, and build better relationships.
                    </p>
                </div>
            </section>

            {/* Case Studies Grid Section */}
            <section className="py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {caseStudies.map((study) => (
                            <a key={study.slug} href={`#/case-studies/${study.slug}`} className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                                <div className="h-full flex flex-col">
                                    <div className="flex-shrink-0 h-56 w-full object-cover">
                                        {study.image}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="h-12 mb-4 flex items-center">
                                            {study.clientLogo}
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                                            {study.title}
                                        </h2>
                                        <p className="mt-4 text-slate-500 flex-grow">{study.summary}</p>
                                        <div className="mt-6">
                                            <span className="inline-flex items-center font-semibold text-indigo-600">
                                                Read the full story
                                                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default CaseStudiesPage;