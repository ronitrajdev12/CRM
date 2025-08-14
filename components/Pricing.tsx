import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon';

const plans = [
    {
        name: 'Starter',
        price: '₹499',
        pricePeriod: '/ month / user',
        description: 'For small teams getting started.',
        features: [
            'Up to 500 Clients',
            'Basic Lead Management',
            'Standard Reporting',
            'Email Support',
        ],
        buttonText: 'Choose Starter',
        bgColor: 'bg-white',
        textColor: 'text-slate-900',
        buttonClass: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        popular: false,
    },
    {
        name: 'Professional',
        price: '₹999',
        pricePeriod: '/ month / user',
        description: 'For growing businesses that need more power.',
        features: [
            'Up to 5,000 Clients',
            'Advanced Lead Management',
            'AI-Powered Insights',
            'Automation Workflows',
            'Priority Email & Chat Support',
        ],
        buttonText: 'Get Started',
        bgColor: 'bg-indigo-600',
        textColor: 'text-white',
        buttonClass: 'bg-white text-indigo-600 hover:bg-indigo-50',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        pricePeriod: '',
        description: 'For large organizations with custom needs.',
        features: [
            'Unlimited Clients',
            'Custom AI Models',
            'Dedicated Account Manager',
            'Advanced Security & SSO',
            '24/7 Premium Support',
        ],
        buttonText: 'Contact Sales',
        bgColor: 'bg-white',
        textColor: 'text-slate-900',
        buttonClass: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        popular: false,
    },
];

const Pricing: React.FC = () => {
    return (
        <section className="bg-slate-50 py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                        Flexible Pricing for Teams of All Sizes
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
                        Choose the plan that fits your needs. All plans come with a 14-day free trial.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-2xl shadow-lg p-8 relative transition-transform duration-300 ${plan.bgColor} ${plan.textColor} ${plan.popular ? 'transform lg:scale-110 z-10' : 'z-0'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-300 text-yellow-900">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <p className={`mt-2 ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.description}</p>
                            
                            <div className="mt-6">
                                <span className="text-5xl font-extrabold">{plan.price}</span>
                                {plan.pricePeriod && (
                                    <span className={`text-lg font-medium ${plan.popular ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.pricePeriod}</span>
                                )}
                            </div>

                            <ul className="mt-8 space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <CheckCircleIcon className={`h-6 w-6 ${plan.popular ? 'text-green-300' : 'text-indigo-500'}`} />
                                        </div>
                                        <p className="ml-3">{feature}</p>
                                    </li>
                                ))}
                            </ul>

                            <a href="#/signup" className={`block w-full text-center mt-10 py-3 px-6 rounded-lg font-bold text-lg transition ${plan.buttonClass}`}>
                                {plan.buttonText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;