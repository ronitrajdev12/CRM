import React, { useState } from 'react';
import SignUpIllustration from './icons/SignUpIllustration';
import GoogleIcon from './icons/GoogleIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import EyeIcon from './icons/EyeIcon';
import EyeOffIcon from './icons/EyeOffIcon';

const SignUpPage: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans flex">
            {/* Left side: Illustration */}
            <div className="hidden lg:flex w-1/2 bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
                <SignUpIllustration className="w-full h-full max-w-2xl" />
                <div className="absolute bottom-12 left-12 text-white">
                    <h1 className="text-4xl font-bold">Aetherium CRM</h1>
                    <p className="text-lg text-slate-300 mt-2">Unlock the power of AI for your business.</p>
                </div>
            </div>

            {/* Right side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-bold text-slate-900">Get started with your 15-day free trial</h2>
                        <p className="text-slate-500 mt-2">Already have an account? <a href="#/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</a></p>
                    </div>

                    <form className="space-y-5">
                        <div>
                            <label htmlFor="full-name" className="sr-only">Full Name</label>
                            <input
                                id="full-name"
                                name="full-name"
                                type="text"
                                required
                                className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password-signup" className="sr-only">Password</label>
                            <input
                                id="password-signup"
                                name="password"
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                className="w-full px-4 py-3 bg-slate-100 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition pr-12"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-indigo-600"
                                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                            >
                                {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                        <div className="flex space-x-2">
                             <input
                                readOnly
                                value="+91"
                                className="w-1/4 px-4 py-3 bg-slate-100 border-transparent rounded-xl text-center text-slate-500 focus:outline-none"
                             />
                             <input
                                id="phone"
                                name="phone"
                                type="tel"
                                className="w-3/4 px-4 py-3 bg-slate-100 border-transparent rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                                placeholder="Phone"
                            />
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition">
                                GET STARTED
                            </button>
                        </div>

                         <div className="flex items-center text-sm">
                            <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded" />
                            <label htmlFor="terms" className="ml-2 block text-slate-600">
                                I agree to the <a href="#" className="font-semibold text-slate-800 hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-slate-800 hover:underline">Privacy Policy</a>.
                            </label>
                        </div>
                    </form>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-slate-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">or sign in using</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-slate-300 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">
                            <GoogleIcon className="h-6 w-6" />
                        </a>
                         <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800">
                            <LinkedInIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;