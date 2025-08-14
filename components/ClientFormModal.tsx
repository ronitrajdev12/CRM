import React, { useState, useEffect, useMemo } from 'react';
import type { Client, Notification } from '../types';
import { PaymentStatus, InquiryType, Sentiment, RiskLevel } from '../types';
import * as geminiService from '../services/geminiService';
import XIcon from './icons/XIcon';
import SparklesIcon from './icons/SparklesIcon';

interface ClientFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (client: Client) => void;
    initialData: Client | null;
    addNotification: (message: string, type: Notification['type']) => void;
}

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const formInputClasses = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition";

const ClientFormModal: React.FC<ClientFormModalProps> = ({ isOpen, onClose, onSubmit, initialData, addNotification }) => {
    const [formData, setFormData] = useState<Partial<Client>>({});
    const [isLoadingAI, setIsLoadingAI] = useState({ type: false, sentiment: false, risk: false });

    const debouncedInquiry = useDebounce(formData.inquiryDescription, 1000);
    const debouncedFeedback = useDebounce(formData.feedback, 1000);

    const getNextStepSuggestion = useMemo(() => {
        if (formData.sentiment === Sentiment.Negative) {
            return "Suggestion: Schedule a call to address concerns.";
        }
        if (formData.inquiryType === InquiryType.Sales) {
            const lastContact = formData.lastContactDate ? new Date(formData.lastContactDate).getTime() : 0;
            const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
            if (lastContact < threeDaysAgo) {
                return "Suggestion: Send a follow-up email.";
            }
        }
        return null;
    }, [formData.sentiment, formData.inquiryType, formData.lastContactDate]);


    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                inquiryDate: today,
                lastContactDate: today,
                paymentStatus: PaymentStatus.Due,
                inquiryType: InquiryType.General,
                totalPayment: 0,
                paymentDue: 0
            });
        }
    }, [initialData]);
    
    // AI for Inquiry Type
    useEffect(() => {
        if (debouncedInquiry && debouncedInquiry.trim().length > 10 && debouncedInquiry !== initialData?.inquiryDescription) {
            const getSuggestion = async () => {
                setIsLoadingAI(prev => ({ ...prev, type: true }));
                try {
                    const suggestedType = await geminiService.suggestInquiryType(debouncedInquiry);
                    if (suggestedType) {
                        setFormData(prev => ({ ...prev, inquiryType: suggestedType }));
                        addNotification(`AI suggested inquiry type: ${suggestedType}`, 'info');
                    }
                } catch (error) {
                    addNotification('Could not get AI suggestion.', 'error');
                } finally {
                    setIsLoadingAI(prev => ({ ...prev, type: false }));
                }
            };
            getSuggestion();
        }
    }, [debouncedInquiry, addNotification, initialData]);
    
    // AI for Sentiment Analysis
    useEffect(() => {
        if (debouncedFeedback && debouncedFeedback.trim().length > 10 && debouncedFeedback !== initialData?.feedback) {
            const analyze = async () => {
                setIsLoadingAI(prev => ({ ...prev, sentiment: true }));
                try {
                    const analyzedSentiment = await geminiService.analyzeSentiment(debouncedFeedback);
                    if (analyzedSentiment) {
                        setFormData(prev => ({ ...prev, sentiment: analyzedSentiment }));
                         addNotification(`AI analyzed sentiment: ${analyzedSentiment}`, 'info');
                    }
                } catch (error) {
                    addNotification('Could not analyze sentiment.', 'error');
                } finally {
                    setIsLoadingAI(prev => ({ ...prev, sentiment: false }));
                }
            };
            analyze();
        }
    }, [debouncedFeedback, addNotification, initialData]);

    const handlePredictRisk = async () => {
        setIsLoadingAI(prev => ({ ...prev, risk: true }));
        try {
            const predictedRisk = await geminiService.predictPaymentRisk(formData);
            if (predictedRisk) {
                setFormData(prev => ({ ...prev, paymentRisk: predictedRisk }));
                addNotification(`AI predicted payment risk: ${predictedRisk}`, 'info');
            }
        } catch(e) {
             addNotification('Could not predict risk.', 'error');
        } finally {
            setIsLoadingAI(prev => ({ ...prev, risk: false }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : parseFloat(value) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData: Client = {
            id: initialData?.id || `cust_${Date.now()}`,
            name: formData.name || '',
            phone: formData.phone || '',
            email: formData.email || '',
            inquiryDescription: formData.inquiryDescription || '',
            inquiryType: formData.inquiryType || InquiryType.General,
            inquiryDate: formData.inquiryDate || new Date().toISOString().split('T')[0],
            lastContactDate: formData.lastContactDate || new Date().toISOString().split('T')[0],
            totalPayment: Number(formData.totalPayment) || 0,
            paymentDue: Number(formData.paymentDue) || 0,
            paymentStatus: formData.paymentStatus || PaymentStatus.Due,
            feedback: formData.feedback || '',
            sentiment: formData.sentiment,
            paymentRisk: formData.paymentRisk,
        };
        onSubmit(finalData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-6 border-b border-slate-200 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-slate-800">{initialData ? 'Edit Client' : 'Add New Client'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Column 1 */}
                        <div className="md:col-span-1 space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Customer Name</label>
                                <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} className={formInputClasses} required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input type="email" name="email" id="email" value={formData.email || ''} onChange={handleChange} className={formInputClasses} required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className={formInputClasses} />
                            </div>
                             <div className="relative">
                                <label htmlFor="inquiryDescription" className="block text-sm font-medium text-slate-700 mb-1">Business Inquiry</label>
                                <textarea name="inquiryDescription" id="inquiryDescription" rows={4} value={formData.inquiryDescription || ''} onChange={handleChange} className={`${formInputClasses} pr-10`} />
                                {isLoadingAI.type && <div className="absolute top-8 right-2 animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>}
                            </div>
                            <div>
                                <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-700 mb-1">Inquiry Type</label>
                                <select name="inquiryType" id="inquiryType" value={formData.inquiryType || ''} onChange={handleChange} className={formInputClasses}>
                                    {Object.values(InquiryType).map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div className="relative">
                                <label htmlFor="feedback" className="block text-sm font-medium text-slate-700 mb-1">Call Review / Feedback</label>
                                <textarea name="feedback" id="feedback" rows={4} value={formData.feedback || ''} onChange={handleChange} className={`${formInputClasses} pr-10`} />
                                 {isLoadingAI.sentiment && <div className="absolute top-8 right-2 animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500"></div>}
                            </div>
                        </div>
                        {/* Column 2 */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="inquiryDate" className="block text-sm font-medium text-slate-700 mb-1">Inquiry Date</label>
                                    <input type="date" name="inquiryDate" id="inquiryDate" value={formData.inquiryDate || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                                <div>
                                    <label htmlFor="lastContactDate" className="block text-sm font-medium text-slate-700 mb-1">Last Contact</label>
                                    <input type="date" name="lastContactDate" id="lastContactDate" value={formData.lastContactDate || ''} onChange={handleChange} className={formInputClasses} />
                                </div>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="totalPayment" className="block text-sm font-medium text-slate-700 mb-1">Total Payment</label>
                                    <input type="number" step="0.01" name="totalPayment" id="totalPayment" value={formData.totalPayment ?? ''} onChange={handleNumberChange} className={formInputClasses} placeholder="0.00" />
                                </div>
                                <div>
                                    <label htmlFor="paymentDue" className="block text-sm font-medium text-slate-700 mb-1">Payment Due</label>
                                    <input type="number" step="0.01" name="paymentDue" id="paymentDue" value={formData.paymentDue ?? ''} onChange={handleNumberChange} className={formInputClasses} placeholder="0.00"/>
                                </div>
                            </div>
                             <div>
                                <label htmlFor="paymentStatus" className="block text-sm font-medium text-slate-700 mb-1">Payment Status</label>
                                <select name="paymentStatus" id="paymentStatus" value={formData.paymentStatus || ''} onChange={handleChange} className={formInputClasses}>
                                    {Object.values(PaymentStatus).map(status => <option key={status} value={status}>{status}</option>)}
                                </select>
                            </div>
                            
                            <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                               <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                                   <SparklesIcon className="h-5 w-5 mr-2 text-indigo-500"/>
                                   AI Analysis
                               </h3>
                               <div className="flex justify-between items-center">
                                   <span className="font-medium text-slate-600">Sentiment:</span>
                                   <span className="font-bold text-slate-800">{formData.sentiment || 'N/A'}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                   <span className="font-medium text-slate-600">Payment Risk:</span>
                                   <span className="font-bold text-slate-800">{formData.paymentRisk || 'N/A'}</span>
                               </div>
                               <button type="button" onClick={handlePredictRisk} disabled={isLoadingAI.risk} className="w-full mt-2 flex items-center justify-center bg-indigo-100 text-indigo-700 hover:bg-indigo-200 font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                                   {isLoadingAI.risk ? 'Analyzing...' : 'Predict Risk'}
                               </button>
                            </div>

                            {getNextStepSuggestion && (
                                <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-r-lg">
                                    <p className="font-bold">Next Step</p>
                                    <p>{getNextStepSuggestion}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <footer className="flex justify-end items-center p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex-shrink-0">
                        <button type="button" onClick={onClose} className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-6 rounded-lg border border-slate-300 mr-3 transition">Cancel</button>
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition">
                            {initialData ? 'Save Changes' : 'Create Client'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default ClientFormModal;