import React from 'react';
import type { CaseStudy } from '../types';

import InnovateCorpLogo from '../components/icons/client_logos/InnovateCorpLogo';
import QuantumLeapCoLogo from '../components/icons/client_logos/QuantumLeapCoLogo';
import CaseStudyImage1 from '../components/icons/case_studies/CaseStudyImage1';
import CaseStudyImage2 from '../components/icons/case_studies/CaseStudyImage2';

import TrendingUpIcon from '../components/icons/TrendingUpIcon';
import BarChartIcon from '../components/icons/BarChartIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import TargetIcon from '../components/icons/TargetIcon';


export const caseStudies: CaseStudy[] = [
    {
        slug: 'innovate-corp-sales-boost',
        clientName: 'Innovate Corp',
        clientLogo: React.createElement(InnovateCorpLogo, { className: "h-10 text-slate-800" }),
        title: 'How Innovate Corp Boosted Lead Conversion by 40% with AI-Powered Insights',
        summary: 'Discover how Innovate Corp transformed their sales process by leveraging Aetherium\'s AI analytics to identify high-value leads and streamline follow-ups.',
        challenge: 'Innovate Corp was struggling with a high volume of inbound leads from various channels. Their sales team spent too much time on manual qualification, and promising opportunities were falling through the cracks. They lacked a unified view of customer interactions, leading to inconsistent follow-ups and a lengthy sales cycle.',
        solution: 'Aetherium CRM was implemented to centralize all lead data. Using our AI-powered lead scoring, Innovate Corp could automatically prioritize the most promising leads. The unified client database provided a 360-degree view of every prospect, while automated follow-up reminders ensured no opportunity was missed. The AI sentiment analysis also helped sales reps tailor their communication for better engagement.',
        results: [
            { value: '+40%', label: 'Lead Conversion Rate', icon: React.createElement(TrendingUpIcon, { className: "h-8 w-8 text-white" }) },
            { value: '-25%', label: 'Sales Cycle Length', icon: React.createElement(BarChartIcon, { className: "h-8 w-8 text-white" }) },
            { value: '95%', label: 'Positive Sales Interactions', icon: React.createElement(TargetIcon, { className: "h-8 w-8 text-white" }) },
        ],
        testimonial: {
            quote: 'Aetherium CRM completely changed the game for us. Our team is more efficient, our forecasting is more accurate, and we\'re closing deals faster than ever before. The AI insights are pure magic.',
            authorName: 'Samantha Jones',
            authorTitle: 'VP of Sales, Innovate Corp',
        },
        image: React.createElement(CaseStudyImage1),
    },
    {
        slug: 'quantumleap-risk-reduction',
        clientName: 'QuantumLeap Co',
        clientLogo: React.createElement(QuantumLeapCoLogo, { className: "h-10 text-slate-800" }),
        title: 'QuantumLeap Co Reduces Overdue Payments by 30% Using Predictive Risk Analysis',
        summary: 'Learn how QuantumLeap Co stabilized their cash flow by using Aetherium\'s AI to predict payment risks and proactively manage their accounts receivable.',
        challenge: 'QuantumLeap Co faced significant cash flow instability due to a growing number of overdue invoices. Their finance team had no systematic way to identify at-risk accounts before they became a problem, leading to time-consuming and often fruitless collection efforts.',
        solution: 'By implementing Aetherium CRM, QuantumLeap Co gained access to our AI-driven Payment Risk prediction model. The system analyzed payment histories and client interaction data to assign a risk level to each account. This allowed the finance team to proactively engage with high-risk clients, offer flexible payment options, and set up automated payment reminders, significantly reducing the number of overdue accounts.',
        results: [
            { value: '-30%', label: 'Overdue Invoices', icon: React.createElement(ShieldCheckIcon, { className: "h-8 w-8 text-white" }) },
            { value: '-50%', label: 'Time Spent on Collections', icon: React.createElement(BarChartIcon, { className: "h-8 w-8 text-white" }) },
            { value: '+20%', label: 'On-Time Payment Rate', icon: React.createElement(TrendingUpIcon, { className: "h-8 w-8 text-white" }) },
        ],
        testimonial: {
            quote: 'The ability to predict which clients might pay late has been a revelation. Aetherium CRM has given us the financial foresight we needed to grow confidently.',
            authorName: 'David Chen',
            authorTitle: 'CFO, QuantumLeap Co',
        },
        image: React.createElement(CaseStudyImage2),
    }
];