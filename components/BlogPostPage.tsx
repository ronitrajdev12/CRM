import React from 'react';
import { blogPosts } from '../data/blogPosts';
import MainLayout from './MainLayout';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface BlogPostPageProps {
    slug: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        return (
            <MainLayout bgClass="bg-white">
                <div className="flex flex-col items-center justify-center text-center py-40">
                    <h1 className="text-4xl font-bold text-slate-800">Post not found</h1>
                    <p className="mt-4 text-slate-600">The blog post you're looking for doesn't exist.</p>
                    <a href="#/blog" className="mt-8 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                        Back to Blog <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </a>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout bgClass="bg-white">
            <article className="py-16 sm:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <header className="mb-12 text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                            {post.title}
                        </h1>
                        <div className="mt-8 flex justify-center items-center">
                             <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                                {post.author.avatar}
                            </div>
                            <div className="ml-4 text-left">
                                <p className="text-lg font-medium text-slate-900">{post.author.name}</p>
                                <p className="text-slate-500">{post.author.title}</p>
                                <time dateTime={post.date} className="text-sm text-slate-400">
                                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>
                        </div>
                    </header>
                    
                    {/* Hero Image */}
                    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl mb-12">
                       {post.image}
                    </div>

                    {/* Content */}
                    <div className="prose prose-indigo prose-lg mx-auto text-slate-600 leading-relaxed">
                        <p className="lead text-xl mb-8 font-semibold">{post.excerpt}</p>
                        <p>{post.content}</p>
                    </div>

                     {/* Back to Blog Link */}
                    <div className="mt-16 text-center">
                         <a href="#/blog" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-lg">
                            Back to All Articles
                        </a>
                    </div>
                </div>
            </article>
        </MainLayout>
    );
};

export default BlogPostPage;