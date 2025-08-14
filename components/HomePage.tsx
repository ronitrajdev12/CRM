import React from 'react';
import DatabaseIcon from './icons/DatabaseIcon';
import ZapIcon from './icons/ZapIcon';
import ClipboardListIcon from './icons/ClipboardListIcon';
import MainLayout from './MainLayout';
import Clients from './Clients';
import Testimonials from './Testimonials';
import Stats from './Stats';
import WhyChooseUs from './WhyChooseUs';
import Pricing from './Pricing';
import Faq from './Faq';
import HeroBackgroundSlider from './HeroBackgroundSlider';
import AnimatedSection from './AnimatedSection';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-5">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{children}</p>
    </div>
);

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            {/* Hero Section */}
            <section className="relative text-white overflow-hidden">
                <HeroBackgroundSlider />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                <div className="relative z-10 flex flex-col justify-center items-center text-center pt-32 pb-24 sm:pt-40 sm:pb-32">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                            Build <span className="text-indigo-400">Everlasting</span> Customer Relationships with AI
                        </h1>
                        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300">
                            Aetherium CRM brings all your customer information into a single, intelligent platform. Boost productivity, gain actionable insights, and deliver exceptional experiences.
                        </p>
                        <div className="mt-10">
                            <a href="#/signup" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                Get Started for Free
                            </a>
                            <p className="mt-4 text-sm text-slate-400">No credit card required.</p>
                        </div>
                    </div>
                    <div className="absolute bottom-12 text-center w-full">
                        <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            TRUSTED BY THE WORLD'S MOST INNOVATIVE COMPANIES
                        </p>
                    </div>
                </div>
            </section>
            
            <Clients />
            <AnimatedSection><Testimonials /></AnimatedSection>
            <Stats />
            <AnimatedSection><WhyChooseUs /></AnimatedSection>

            {/* Features Section */}
            <AnimatedSection>
                <section className="py-20 sm:py-28 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">A Smarter Way to Manage Your Business</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                                Everything you need to organize, track, and nurture your customer relationships.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard 
                                icon={<DatabaseIcon className="h-6 w-6 text-indigo-600" />} 
                                title="Unified Client Database"
                            >
                                Keep all client information, interactions, and payment history in one organized place. Access data instantly and get a 360° view of every customer.
                            </FeatureCard>
                             <FeatureCard 
                                icon={<ZapIcon className="h-6 w-6 text-indigo-600" />} 
                                title="AI-Powered Insights"
                            >
                                Leverage generative AI to analyze customer feedback, predict payment risks, and automatically categorize inquiries to save time and reduce errors.
                            </FeatureCard>
                             <FeatureCard 
                                icon={<ClipboardListIcon className="h-6 w-6 text-indigo-600" />} 
                                title="Effortless Lead Capture"
                            >
                                Never miss an opportunity. Capture new leads directly from your dashboard and ensure timely follow-ups with automated action items.
                            </FeatureCard>
                        </div>
                    </div>
                </section>
            </AnimatedSection>

            <AnimatedSection><Pricing /></AnimatedSection>
            <AnimatedSection><Faq /></AnimatedSection>
        </MainLayout>
    );
};

export default HomePage;