
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// The main CRM dashboard view.
import AetheriumCrmApp from './components/AetheriumCrmApp';

// The marketing site pages.
import HomePage from './components/HomePage';
import AboutUsPage from './components/AboutUsPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import CaseStudiesPage from './components/CaseStudiesPage';
import CaseStudyPage from './components/CaseStudyPage';
import SignUpPage from './components/SignUpPage';

// Individual product pages.
import CallAnalyzerPage from './components/CallAnalyzerPage';
import PaymentTrackerPage from './components/PaymentTrackerPage';

// Placeholder for future pages
import PlaceholderPage from './components/PlaceholderPage';

/**
 * A simple hash-based router component to navigate between pages.
 */
const Router: React.FC = () => {
    const getPath = () => window.location.hash.replace(/^#/, '') || '/marketing';
    const [currentPath, setCurrentPath] = useState(getPath);

    useEffect(() => {
        const onHashChange = () => {
            setCurrentPath(getPath());
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', onHashChange);
        return () => window.removeEventListener('hashchange', onHashChange);
    }, []);

    // Handle dynamic routes with slugs first
    if (currentPath.startsWith('/blog/')) {
        const slug = currentPath.substring('/blog/'.length);
        return <BlogPostPage slug={slug} />;
    }
    
    if (currentPath.startsWith('/case-studies/')) {
        const slug = currentPath.substring('/case-studies/'.length);
        return <CaseStudyPage slug={slug} />;
    }

    // Handle static routes
    switch (currentPath) {
        // Core Marketing Pages
        case '/marketing':
            return <HomePage />;
        case '/about':
            return <AboutUsPage />;
        case '/blog':
            return <BlogPage />;
        case '/case-studies':
            return <CaseStudiesPage />;
        case '/signup':
            return <SignUpPage />;
        
        // Main App/Dashboard
        case '/dashboard':
            return <AetheriumCrmApp />;

        // Implemented Product Pages
        case '/products/crm':
            return <AetheriumCrmApp />;
        case '/products/call-analyzer':
            return <CallAnalyzerPage />;
        case '/products/payment-tracker':
            return <PaymentTrackerPage />;

        // Placeholder Pages for future features
        case '/products/excel-sync':
            return <PlaceholderPage title="Excel Sync Tool" message="This feature is coming soon! Stay tuned for seamless integration with your spreadsheets." />;
        
        case '/services/consulting':
            return <PlaceholderPage title="AI Business Consulting" message="Our consulting services are launching soon. Get ready for expert guidance." />;
        case '/services/dashboards':
            return <PlaceholderPage title="Custom Dashboard Development" message="Bespoke dashboards tailored to your needs are on the way." />;
        case '/services/automation':
            return <PlaceholderPage title="Automation Solutions" message="Powerful automation solutions are under development." />;
        case '/services/data-migration':
            return <PlaceholderPage title="Data Cleanup & Migration" message="Our data services will be available shortly to help you manage your data." />;

        case '/hospitality/feedback':
            return <PlaceholderPage title="Guest Feedback Analyzer" message="This hospitality-focused feature is coming soon!" />;
        case '/hospitality/forecasting':
            return <PlaceholderPage title="Reservation Predictor" message="This hospitality-focused feature is coming soon!" />;
        case '/hospitality/loyalty':
            return <PlaceholderPage title="Loyalty Tracking System" message="This hospitality-focused feature is coming soon!" />;
        case '/hospitality/crm':
            return <PlaceholderPage title="Hospitality CRM" message="This hospitality-focused feature is coming soon!" />;
        
        case '/career':
             return <PlaceholderPage title="Careers" message="We're building our team! Our careers page is coming soon." />;
        case '/contact':
             return <PlaceholderPage title="Contact Us" message="Our contact page is under construction. We look forward to hearing from you soon." />;
        case '/login':
             return <PlaceholderPage title="Sign In" message="The sign-in page is currently under development. Please use the Sign Up page for now." />;

        // Default case for any other route
        default:
            return <HomePage />;
    }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
