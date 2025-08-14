import React, { useState } from 'react';
import type { Client } from '../types';
import { InquiryType, PaymentStatus } from '../types';
import * as geminiService from '../services/geminiService';

type LeadFormData = {
    name: string;
    email: string;
    phone: string;
    inquiryDescription: string;
};

interface LeadCaptureFormProps {
    onLeadSubmit: (data: Client) => void;
}

const formInputClasses = "block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition";

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({ onLeadSubmit }) => {
    const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', phone: '', inquiryDescription: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.inquiryDescription) {
            setError('Please fill out all required fields (Name, Email, and Inquiry).');
            return;
        }

        setIsLoading(true);
        setError('');

        const suggestedType = await geminiService.suggestInquiryType(formData.inquiryDescription);

        const newLead: Client = {
            id: `lead_${Date.now()}`,
            name: formData.name,
            phone: formData.phone || '',
            email: formData.email,
            inquiryDescription: formData.inquiryDescription,
            inquiryType: suggestedType || InquiryType.General,
            inquiryDate: new Date().toISOString().split('T')[0],
            lastContactDate: new Date().toISOString().split('T')[0],
            totalPayment: 0,
            paymentDue: 0,
            paymentStatus: PaymentStatus.NewLead,
            feedback: '',
        };

        onLeadSubmit(newLead);
        
        setFormData({ name: '', email: '', phone: '', inquiryDescription: '' });
        setIsSubmitted(true);
        setIsLoading(false);
        setTimeout(() => setIsSubmitted(false), 4000);
    };

    return (
        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Capture New Lead</h2>
                <p className="text-slate-500 mt-1">Quickly add a new lead to the system directly from the dashboard.</p>
            </div>
            {isSubmitted ? (
                 <div className="text-center p-4 bg-green-100 text-green-800 rounded-lg transition-all duration-300">
                    <p className="font-bold">Lead submitted successfully!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="lead-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                            <input type="text" name="name" id="lead-name" value={formData.name} onChange={handleChange} className={formInputClasses} placeholder="John Doe" required disabled={isLoading} />
                        </div>
                         <div>
                            <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                            <input type="email" name="email" id="lead-email" value={formData.email} onChange={handleChange} className={formInputClasses} placeholder="you@example.com" required disabled={isLoading} />
                        </div>
                         <div>
                            <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="tel" name="phone" id="lead-phone" value={formData.phone} onChange={handleChange} className={formInputClasses} placeholder="(123) 456-7890" disabled={isLoading} />
                        </div>
                         <div className="md:col-span-2">
                            <label htmlFor="lead-inquiryDescription" className="block text-sm font-medium text-slate-700 mb-1">How can we help? <span className="text-red-500">*</span></label>
                            <textarea name="inquiryDescription" id="lead-inquiryDescription" rows={3} value={formData.inquiryDescription} onChange={handleChange} className={formInputClasses} placeholder="Describe your inquiry..." required disabled={isLoading} />
                        </div>
                    </div>
                    
                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end">
                        <button type="submit" disabled={isLoading} className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                            {isLoading ? 'Analyzing & Submitting...' : 'Submit Lead'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default LeadCaptureForm;