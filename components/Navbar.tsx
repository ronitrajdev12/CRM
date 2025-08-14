



import React, { useState, useEffect } from 'react';
import MenuIcon from './icons/MenuIcon';
import XIcon from './icons/XIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CrmIcon from './icons/CrmIcon';
import PhoneWaveIcon from './icons/PhoneWaveIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import FileSyncIcon from './icons/FileSyncIcon';

const navLinks = [
    { name: 'Marketing', href: '#/marketing' },
    { name: 'About Us', href: '#/about' },
    { name: 'Blog', href: '#/blog' },
    {
        name: 'Products',
        dropdown: [
            { name: 'Customer Inventory Manager', description: 'CRM tool to track customer details', href: '#/products/crm', icon: <CrmIcon className="h-6 w-6 text-indigo-500" /> },
            { name: 'AI Call Review Analyzer', description: 'Sentiment analysis for calls', href: '#/products/call-analyzer', icon: <PhoneWaveIcon className="h-6 w-6 text-indigo-500" /> },
            { name: 'Payment Tracker', description: 'Tracks paid and pending dues', href: '#/products/payment-tracker', icon: <CreditCardIcon className="h-6 w-6 text-indigo-500" /> },
            { name: 'Excel Sync Tool', description: 'Auto-sync records to Excel', href: '#/products/excel-sync', icon: <FileSyncIcon className="h-6 w-6 text-indigo-500" /> },
        ],
    },
    {
        name: 'Services',
        dropdown: [
            { name: 'AI Business Consulting', description: 'Advisory for integrating AI', href: '#/services/consulting' },
            { name: 'Custom Dashboard Development', description: 'Tailored analytics dashboards', href: '#/services/dashboards' },
            { name: 'Automation Solutions', description: 'Automate workflows using AI/ML', href: '#/services/automation' },
            { name: 'Data Cleanup & Migration', description: 'Structure and migrate messy data', href: '#/services/data-migration' },
        ],
    },
    { name: 'Case Studies', href: '#/case-studies' },
    { name: 'Career', href: '#/career' },
    { name: 'Contact Us', href: '#/contact' },
];

const DropdownMenu: React.FC<{ items: { name: string, description: string, href: string, icon?: React.ReactNode }[], closeMobileMenu?: () => void }> = ({ items, closeMobileMenu }) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="relative grid gap-2 bg-white px-2 py-4">
            {items.map((item) => (
                <a key={item.name} href={item.href} onClick={closeMobileMenu} className="-m-1 p-3 flex items-start rounded-lg hover:bg-slate-50 transition ease-in-out duration-150">
                    {item.icon && <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-50 text-white sm:h-12 sm:w-12">
                       {item.icon}
                    </div>}
                    <div className={item.icon ? "ml-4" : ""}>
                        <p className="text-base font-medium text-slate-900">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                    </div>
                </a>
            ))}
        </div>
    </div>
);

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const MobileMenu = () => (
        <div className="fixed inset-0 bg-white z-50 p-6 md:hidden">
            <div className="flex justify-between items-center mb-8">
                <a href="#/dashboard" onClick={closeMobileMenu} className="text-2xl font-bold text-slate-800">Aetherium <span className="text-indigo-600">CRM</span></a>
                <button onClick={closeMobileMenu}><XIcon className="h-6 w-6" /></button>
            </div>
            <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                    <div key={link.name}>
                        {link.dropdown ? (
                             <details className="group">
                                <summary className="flex justify-between items-center font-semibold text-slate-700 hover:text-indigo-600 cursor-pointer py-2">
                                    {link.name}
                                    <ChevronDownIcon className="h-5 w-5 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="pl-4 mt-2 space-y-2 border-l-2 border-slate-200">
                                    {link.dropdown.map(item => (
                                        <a key={item.name} href={item.href} onClick={closeMobileMenu} className="block text-slate-600 hover:text-indigo-600 py-1">{item.name}</a>
                                    ))}
                                </div>
                            </details>
                        ) : (
                            <a href={link.href} onClick={closeMobileMenu} className="font-semibold text-slate-700 hover:text-indigo-600 py-2 block">{link.name}</a>
                        )}
                    </div>
                ))}
                 <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                    <a href="#/dashboard" onClick={closeMobileMenu} className="w-full text-center block border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold py-3 px-5 rounded-lg shadow-sm">
                        Sign In
                    </a>
                    <a href="#/signup" onClick={closeMobileMenu} className="w-full text-center block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg shadow-sm">
                        Sign Up
                    </a>
                </div>
            </nav>
        </div>
    );

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200/50">
            {isMobileMenuOpen && <MobileMenu />}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <a href="#/dashboard" className="text-2xl font-bold text-slate-800">
                        Aetherium <span className="text-indigo-600">CRM</span>
                    </a>
                    
                    <div className="flex items-center">
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative" onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)} onMouseLeave={() => link.dropdown && setOpenDropdown(null)}>
                                    {link.dropdown ? (
                                        <>
                                            <button className="inline-flex items-center font-semibold text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap">
                                                {link.name}
                                                <ChevronDownIcon className="h-5 w-5 ml-1" />
                                            </button>
                                            {openDropdown === link.name && <DropdownMenu items={link.dropdown} />}
                                        </>
                                    ) : (
                                        <a href={link.href} className="font-semibold text-slate-700 hover:text-indigo-600 transition-colors whitespace-nowrap">{link.name}</a>
                                    )}
                                </div>
                            ))}
                        </nav>
                        
                        <a href="#/dashboard" className="hidden md:inline-block ml-8 font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                            Sign In
                        </a>
                        <a href="#/signup" className="hidden md:inline-block ml-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-5 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                            Sign Up
                        </a>

                        <button className="md:hidden ml-4" onClick={() => setIsMobileMenuOpen(true)}>
                            <MenuIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;