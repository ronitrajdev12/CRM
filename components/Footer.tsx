


import React from 'react';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const footerLinks = {
    products: [
        { name: 'Customer Inventory Manager', href: '#/products/crm' },
        { name: 'AI Call Review Analyzer', href: '#/products/call-analyzer' },
        { name: 'Payment Tracker', href: '#/products/payment-tracker' },
        { name: 'Excel Sync Tool', href: '#/products/excel-sync' },
    ],
    services: [
        { name: 'AI Business Consulting', href: '#/services/consulting' },
        { name: 'Custom Dashboard Development', href: '#/services/dashboards' },
        { name: 'Automation Solutions', href: '#/services/automation' },
        { name: 'Data Cleanup & Migration', href: '#/services/data-migration' },
    ],
    hospitality: [
        { name: 'Guest Feedback Analyzer', href: '#/hospitality/feedback' },
        { name: 'Reservation Predictor', href: '#/hospitality/forecasting' },
        { name: 'Loyalty Tracking System', href: '#/hospitality/loyalty' },
        { name: 'Hospitality CRM', href: '#/hospitality/crm' },
    ],
    company: [
        { name: 'About Us', href: '#/about' },
        { name: 'Blog', href: '#/blog' },
        { name: 'Case Studies', href: '#/case-studies' },
        { name: 'Career', href: '#/career' },
        { name: 'Contact Us', href: '#/contact' },
    ]
};

const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon className="h-6 w-6" />, href: '#' },
    { name: 'Instagram', icon: <InstagramIcon className="h-6 w-6" />, href: '#' },
    { name: 'Twitter', icon: <TwitterIcon className="h-6 w-6" />, href: '#' },
    { name: 'LinkedIn', icon: <LinkedInIcon className="h-6 w-6" />, href: '#' },
];


const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                         <a href="#/marketing" className="text-3xl font-bold text-white">
                            Aetherium <span className="text-indigo-400">CRM</span>
                        </a>
                        <p className="text-slate-400 text-base">
                            Build everlasting customer relationships with AI.
                        </p>
                        <div className="flex space-x-6">
                            {socialLinks.map((item) => (
                                <a key={item.name} href={item.href} className="text-slate-400 hover:text-indigo-400 transition-colors">
                                    <span className="sr-only">{item.name}</span>
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Products</h3>
                                <ul className="mt-4 space-y-4">
                                    {footerLinks.products.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-slate-400 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Services</h3>
                                <ul className="mt-4 space-y-4">
                                     {footerLinks.services.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-slate-400 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Hospitality</h3>
                                <ul className="mt-4 space-y-4">
                                     {footerLinks.hospitality.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-slate-400 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">Company</h3>
                                <ul className="mt-4 space-y-4">
                                     {footerLinks.company.map((item) => (
                                        <li key={item.name}>
                                            <a href={item.href} className="text-base text-slate-400 hover:text-white">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-700 pt-8">
                    <p className="text-base text-slate-400 text-center">&copy; {new Date().getFullYear()} Aetherium CRM. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;