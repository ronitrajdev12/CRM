import React from 'react';
import MainLayout from './MainLayout';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface PlaceholderPageProps {
    title: string;
    message: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message }) => {
    return (
        <MainLayout>
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto -mt-20">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        {title}
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 leading-8">
                        {message}
                    </p>
                    <a href="#/marketing" className="mt-10 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        Go to Homepage <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </div>
        </MainLayout>
    );
};

export default PlaceholderPage;