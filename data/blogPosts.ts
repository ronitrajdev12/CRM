import React from 'react';
import type { Author, BlogPost } from '../types';
import Avatar4 from '../components/icons/avatars/Avatar4';
import BlogPostImage1 from '../components/icons/blog/BlogPostImage1';
import BlogPostImage2 from '../components/icons/blog/BlogPostImage2';
import BlogPostImage3 from '../components/icons/blog/BlogPostImage3';
import BlogPostImage4 from '../components/icons/blog/BlogPostImage4';

const authors: { [key: string]: Author } = {
    janeDoe: {
        name: 'Dr. Evelyn Reed',
        title: 'Head of AI Research',
        avatar: React.createElement(Avatar4)
    }
};

export const blogPosts: BlogPost[] = [
    {
        slug: 'ai-in-crm-the-future-of-customer-relationships',
        title: 'AI in CRM: The Future of Customer Relationships',
        excerpt: 'Explore how generative AI is revolutionizing the CRM landscape, from predictive analytics to hyper-personalized customer interactions.',
        content: 'Generative AI is no longer a futuristic concept; it\'s a transformative force in the world of Customer Relationship Management (CRM). By integrating AI, businesses can move beyond simple data storage to create dynamic, predictive systems that anticipate customer needs. At Aetherium, our AI models analyze communication patterns to predict sentiment, identify up-sell opportunities, and even forecast potential churn risks. This allows sales and support teams to be proactive rather than reactive, fostering stronger, more profitable customer relationships. The future isn\'t just about knowing your customer; it\'s about understanding them on a deeper level, and AI is the key to unlocking that understanding.',
        author: authors.janeDoe,
        date: '2024-07-20',
        image: React.createElement(BlogPostImage1),
    },
    {
        slug: '5-metrics-every-growing-business-should-track',
        title: '5 Key Metrics Every Growing Business Should Track in Their CRM',
        excerpt: 'Go beyond revenue and learn about the crucial metrics like Customer Lifetime Value (CLV) and churn rate that truly define business health.',
        content: 'While revenue is a vital sign, it doesn\'t tell the whole story. To truly understand the health and trajectory of your business, you need to track a more nuanced set of metrics within your CRM. These include: 1. Customer Lifetime Value (CLV), which helps you understand the long-term worth of a customer. 2. Churn Rate, the percentage of customers who stop using your service over a given period. 3. Lead Conversion Rate, to measure the effectiveness of your sales funnel. 4. Average Resolution Time, for gauging customer support efficiency. 5. Net Promoter Score (NPS), to measure customer loyalty. Tracking these provides a holistic view, enabling smarter, data-driven decisions.',
        author: authors.janeDoe,
        date: '2024-07-15',
        image: React.createElement(BlogPostImage2),
    },
    {
        slug: 'from-messy-to-meaningful-the-power-of-clean-data',
        title: 'From Messy to Meaningful: The Power of Clean Data',
        excerpt: 'Dirty data can cost businesses thousands. Learn the best practices for cleaning, organizing, and maintaining your customer data for maximum impact.',
        content: 'In the age of big data, the quality of your data is more important than its quantity. "Dirty data"—inaccurate, incomplete, or duplicate records—can lead to flawed insights, wasted marketing spend, and poor customer experiences. A robust CRM like Aetherium is your first line of defense. Implementing strict data entry protocols, performing regular audits to remove duplicates, and using tools to standardize formats are crucial steps. A clean database ensures that your AI-powered insights are accurate, your marketing campaigns reach the right people, and your sales team has the reliable information they need to close deals. Investing in data hygiene is investing in the future of your business.',
        author: authors.janeDoe,
        date: '2024-07-10',
        image: React.createElement(BlogPostImage3),
    },
    {
        slug: 'automating-success-how-to-leverage-crm-workflows',
        title: 'Automating Success: How to Leverage CRM Workflows',
        excerpt: 'Discover how to automate repetitive tasks, from follow-up emails to task assignments, freeing up your team to focus on what matters most: your customers.',
        content: 'Automation is one of the most powerful features of a modern CRM. By setting up workflows, you can eliminate manual, time-consuming tasks that are prone to human error. For example, you can create a workflow that automatically sends a welcome email to a new lead, assigns a follow-up task to a sales representative after three days, and notifies a manager if the lead hasn\'t been contacted within a week. This not only increases efficiency but also ensures a consistent and timely experience for every customer. At Aetherium, we empower you to build custom automation rules that fit your unique business processes, allowing your team to work smarter, not harder.',
        author: authors.janeDoe,
        date: '2024-07-05',
        image: React.createElement(BlogPostImage4),
    }
];