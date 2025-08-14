import React from 'react';
import { blogPosts } from '../data/blogPosts';
import MainLayout from './MainLayout';

const BlogPage: React.FC = () => {
    return (
        <MainLayout bgClass="bg-white">
            {/* Hero Section */}
            <section className="bg-slate-50 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        Aetherium <span className="text-indigo-600">Insights</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 leading-8">
                        Expert analysis on AI, CRM, and the future of business. Your guide to building smarter, more profitable customer relationships.
                    </p>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {blogPosts.map((post) => (
                            <a key={post.slug} href={`#/blog/${post.slug}`} className="group block">
                                <div className="overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                                    <div className="flex-shrink-0">
                                        <div className="h-48 w-full object-cover">
                                            {post.image}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200">
                                            {post.title}
                                        </h2>
                                        <p className="mt-3 text-slate-500 flex-grow">{post.excerpt}</p>
                                        <div className="mt-6 flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                               {post.author.avatar}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-slate-900">{post.author.name}</p>
                                                <div className="flex space-x-1 text-sm text-slate-500">
                                                    <time dateTime={post.date}>
                                                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </time>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default BlogPage;