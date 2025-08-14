import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    bgClass?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, bgClass = 'bg-slate-50' }) => {
    return (
        <div className={`min-h-screen font-sans text-slate-800 flex flex-col ${bgClass}`}>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;