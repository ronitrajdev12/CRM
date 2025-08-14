import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

const faqData = [
    {
        question: 'Is there a free trial available?',
        answer: 'Yes, absolutely! We offer a full-featured 14-day free trial for all our plans. No credit card is required to get started. You can explore all the features and see how Aetherium CRM can benefit your business.'
    },
    {
        question: 'How secure is my data with Aetherium CRM?',
        answer: 'Data security is our top priority. We use industry-standard encryption for data in transit and at rest. Our infrastructure is hosted on secure, certified cloud providers, and we perform regular security audits to ensure your data is always safe.'
    },
    {
        question: 'Can I import my existing customer data?',
        answer: 'Yes, you can easily import your existing data from spreadsheets (like Excel or CSV files). Our Excel Sync Tool also allows for continuous synchronization to make data migration and management seamless.'
    },
    {
        question: 'What kind of support do you offer?',
        answer: 'We offer 24x5 email and chat support for all our plans. Our Enterprise plan includes a dedicated account manager and 24x7 premium support for any urgent needs. Our goal is to ensure you have all the help you need to succeed.'
    },
    {
        question: 'Can I change my plan later?',
        answer: 'Of course. You can upgrade or downgrade your plan at any time directly from your account settings. The changes will be prorated, so you only pay for what you use.'
    }
];

const FaqItem: React.FC<{
    item: { question: string, answer: string };
    isOpen: boolean;
    onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-slate-200 py-6">
            <dt>
                <button
                    onClick={onClick}
                    className="w-full flex justify-between items-center text-left text-slate-800"
                >
                    <span className="text-lg font-medium">{item.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                            className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : 'rotate-0'}`}
                        />
                    </span>
                </button>
            </dt>
            <dd className={`mt-4 pr-12 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <p className="text-base text-slate-600">{item.answer}</p>
            </dd>
        </div>
    );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                     <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                        Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
                    </p>
                </div>
                <dl className="space-y-2">
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => handleClick(index)}
                        />
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default Faq;
