import React from 'react';
import MainLayout from './MainLayout';
import CustomerObsessedIcon from './icons/CustomerObsessedIcon';
import InnovationIcon from './icons/InnovationIcon';
import SimplicityIcon from './icons/SimplicityIcon';
import GrowthIcon from './icons/GrowthIcon';
import Avatar1 from './icons/avatars/Avatar1';
import Avatar2 from './icons/avatars/Avatar2';
import Avatar3 from './icons/avatars/Avatar3';


const timelineEvents = [
    { year: '2021', title: 'The Spark', description: "Frustrated with clunky, disconnected tools, our founders sketched the first Aetherium prototype on a whiteboard." },
    { year: '2022', title: 'Launch Day', description: "Aetherium CRM 1.0 is launched, focusing on a unified client database and effortless lead capture." },
    { year: '2023', title: 'The AI Leap', description: "We integrate our first generative AI models for sentiment analysis and payment risk prediction." },
    { year: '2024', title: 'Industry Recognition', description: "Named a Leader in the CRM Technology Value Matrix by Nucleus Research." }
];

const teamMembers = [
    { name: 'Alex Johnson', title: 'Co-Founder & CEO', avatar: <Avatar1 className="h-full w-full object-cover" />, bio: "Passionate about building intuitive software that solves real-world problems for growing businesses." },
    { name: 'Priya Sharma', title: 'Co-Founder & CTO', avatar: <Avatar2 className="h-full w-full object-cover" />, bio: "A technology enthusiast dedicated to leveraging AI and machine learning to create intelligent, efficient systems." },
    { name: 'Michael Chen', title: 'Head of Product', avatar: <Avatar3 className="h-full w-full object-cover" />, bio: "Focused on user-centric design and crafting seamless experiences that empower our customers to succeed." }
];

const coreValues = [
    { icon: <CustomerObsessedIcon className="h-8 w-8 text-indigo-500" />, title: 'Customer-Obsessed', description: "We build for our users, first and always. Your feedback is the most critical input in our development process." },
    { icon: <InnovationIcon className="h-8 w-8 text-indigo-500" />, title: 'Innovate with Purpose', description: "We embrace cutting-edge AI not for its own sake, but to solve real business problems and deliver tangible results." },
    { icon: <SimplicityIcon className="h-8 w-8 text-indigo-500" />, title: 'Simplicity in Design', description: "We believe the most powerful tools are the ones that are a joy to use. We obsess over clean, intuitive interfaces." },
    { icon: <GrowthIcon className="h-8 w-8 text-indigo-500" />, title: 'Grow Together', description: "We see ourselves as partners in our clients' success. When you grow, we grow." },
];

const AboutUsPage: React.FC = () => {
    return (
        <MainLayout bgClass="bg-white">
            {/* Hero Section */}
            <section className="bg-slate-50 py-20 sm:py-32">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        The Story Behind <span className="text-indigo-600">Smarter Relationships</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 leading-8">
                        We believe technology should empower human connection, not replace it. Our mission is to build intelligent, intuitive tools that simplify complexity, foster meaningful relationships, and help businesses thrive.
                    </p>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="py-20 sm:py-28">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Journey</h2>
                        <p className="mt-4 text-lg text-slate-500">From a whiteboard sketch to a globally recognized platform.</p>
                    </div>
                    <div className="relative">
                        {/* The vertical line */}
                        <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-slate-200" aria-hidden="true"></div>
                        <div className="space-y-16">
                            {timelineEvents.map((event, index) => (
                                <div key={index} className="relative flex items-center">
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <div className={`p-6 rounded-xl shadow-lg bg-white`}>
                                            <p className="text-sm font-semibold text-indigo-600">{event.year}</p>
                                            <h3 className="text-xl font-bold text-slate-800 mt-1">{event.title}</h3>
                                            <p className="mt-2 text-slate-600">{event.description}</p>
                                        </div>
                                    </div>
                                    <div className="absolute left-1/2 -ml-3 h-6 w-6 rounded-full bg-indigo-600 border-4 border-white"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Innovators Section */}
            <section className="bg-slate-50 py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Meet the Innovators</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">The passionate minds behind Aetherium CRM.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="relative h-32 w-32 mx-auto mb-4">
                                    <div className="absolute inset-0 rounded-full bg-indigo-200"></div>
                                    <div className="relative h-full w-full rounded-full overflow-hidden shadow-lg border-4 border-white">
                                        {member.avatar}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
                                <p className="text-indigo-600 font-semibold">{member.title}</p>
                                <p className="mt-2 text-slate-500 max-w-xs mx-auto">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Core Values Section */}
            <section className="py-20 sm:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Core Values</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">The principles that guide every decision we make.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {coreValues.map((value) => (
                            <div key={value.title} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">{value.title}</h3>
                                <p className="mt-2 text-slate-500">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Join our Mission Section */}
            <section className="bg-indigo-700">
                 <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to build the future with us?</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                       We're always looking for passionate, talented people to join our mission. If you love solving complex problems and creating beautiful products, we want to hear from you.
                    </p>
                    <a href="#/career" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
                        View Open Positions
                    </a>
                </div>
            </section>
        </MainLayout>
    );
};

export default AboutUsPage;