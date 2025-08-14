import React from 'react';
import { caseStudies } from '../data/caseStudies';
import MainLayout from './MainLayout';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface CaseStudyPageProps {
    slug: string;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug }) => {
    const study = caseStudies.find(p => p.slug === slug);

    if (!study) {
        return (
            <MainLayout bgClass="bg-white">
                <div className="flex flex-col items-center justify-center text-center py-40">
                    <h1 className="text-4xl font-bold text-slate-800">Case Study not found</h1>
                    <p className="mt-4 text-slate-600">The story you're looking for doesn't exist.</p>
                    <a href="#/case-studies" className="mt-8 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                        Back to Case Studies <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout bgClass="bg-white">
            {/* Hero */}
            <section className="relative bg-slate-900 py-24 sm:py-32">
                 <div className="absolute inset-0 overflow-hidden">
                    {study.image}
                </div>
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <div className="h-16 flex items-center justify-center grayscale brightness-0 invert">
                        {study.clientLogo}
                    </div>
                    <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
                        {study.title}
                    </h1>
                </div>
            </section>

            <article className="py-16 sm:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-indigo prose-lg text-slate-600 leading-relaxed">
                    
                    {/* The Challenge */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Challenge</h2>
                        <p>{study.challenge}</p>
                    </div>

                    {/* The Solution */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">The Solution</h2>
                        <p>{study.solution}</p>
                    </div>

                    {/* The Results */}
                    <div className="bg-indigo-600 text-white rounded-2xl p-8 sm:p-12 my-16 not-prose">
                        <h2 className="text-3xl font-bold mb-6 text-center">Tangible Results</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                            {study.results.map(result => (
                                <div key={result.label} className="flex flex-col items-center">
                                    <div className="bg-white/10 rounded-full p-4 mb-3">
                                        {result.icon}
                                    </div>
                                    <p className="text-4xl font-extrabold">{result.value}</p>
                                    <p className="text-indigo-200 font-medium">{result.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-xl font-semibold leading-8 tracking-tight text-slate-900 border-l-4 border-indigo-500 pl-6 italic">
                      <p>"{study.testimonial.quote}"</p>
                       <footer className="mt-6">
                            <div className="font-bold not-italic">{study.testimonial.authorName}</div>
                            <div className="text-base text-slate-500 not-italic">{study.testimonial.authorTitle}</div>
                        </footer>
                    </blockquote>
                </div>

                 {/* Back to Case Studies Link */}
                <div className="mt-16 text-center">
                     <a href="#/case-studies" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-lg">
                        Explore More Success Stories
                    </a>
                </div>
            </article>
        </MainLayout>
    );
};

export default CaseStudyPage;