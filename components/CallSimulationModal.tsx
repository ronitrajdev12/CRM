import React, { useState, useEffect } from 'react';
import type { Client, Notification, CallAnalysisData } from '../types';
import * as geminiService from '../services/geminiService';
import XIcon from './icons/XIcon';
import SparklesIcon from './icons/SparklesIcon';
import BotIcon from './icons/BotIcon';
import UserIcon from './icons/UserIcon';
import { Sentiment } from '../types';

interface CallSimulationModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: Client;
    onSave: (clientId: string, analysis: CallAnalysisData, transcript: string, purpose: string) => void;
    addNotification: (message: string, type: Notification['type']) => void;
}

const callPurposes = {
    'Payment Reminder': 'Remind them about their overdue payment.',
    'Feedback Collection': 'Ask for feedback about their experience with our service.',
    'General Query': 'Check in with them regarding their recent support query.'
};

type PurposeKey = keyof typeof callPurposes;

const AnalysisDisplay: React.FC<{ analysis: CallAnalysisData }> = ({ analysis }) => {
    const getSentimentClasses = (sentiment: Sentiment) => {
        switch (sentiment) {
            case Sentiment.Positive: return 'bg-green-100 text-green-800';
            case Sentiment.Neutral: return 'bg-blue-100 text-blue-800';
            case Sentiment.Negative: return 'bg-red-100 text-red-800';
        }
    };
    return (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center"><SparklesIcon className="h-5 w-5 mr-2 text-indigo-500" />Call Analysis Complete</h3>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
                 <div>
                    <strong className="text-slate-600">Sentiment:</strong>
                    <span className={`ml-2 px-2 py-1 text-sm font-semibold rounded-full ${getSentimentClasses(analysis.sentiment)}`}>{analysis.sentiment}</span>
                </div>
                <div>
                    <strong className="text-slate-600">Summary:</strong>
                    <p className="text-slate-700 italic">{analysis.summary}</p>
                </div>
                 <div>
                    <strong className="text-slate-600">Key Points:</strong>
                    <ul className="list-disc list-inside text-slate-700">
                        {analysis.keyPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                </div>
                <div>
                    <strong className="text-slate-600">Specific Feedback:</strong>
                    <p className="text-slate-700">{analysis.feedback}</p>
                </div>
            </div>
        </div>
    );
};


const CallSimulationModal: React.FC<CallSimulationModalProps> = ({ isOpen, onClose, client, onSave, addNotification }) => {
    const [purpose, setPurpose] = useState<PurposeKey>('Payment Reminder');
    const [isLoading, setIsLoading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [analysis, setAnalysis] = useState<CallAnalysisData | null>(null);

    useEffect(() => {
        if (isOpen) {
            setTranscript('');
            setAnalysis(null);
            setIsLoading(false);
            setIsAnalyzing(false);
            // Set default purpose based on client status
            if (client.paymentStatus === 'Overdue' || client.paymentStatus === 'Due') {
                setPurpose('Payment Reminder');
            } else if (client.inquiryType === 'Support') {
                setPurpose('General Query');
            } else {
                setPurpose('Feedback Collection');
            }
        }
    }, [isOpen, client]);

    const handleStartCall = async () => {
        setIsLoading(true);
        setTranscript('');
        setAnalysis(null);
        const agentMessage = `Hi ${client.name.split(' ')[0]}, this is the AI assistant from Aetherium calling. I'm just reaching out to ${callPurposes[purpose].toLowerCase().replace('.', '')}.`;
        const customerResponse = await geminiService.generateCustomerResponse(client, callPurposes[purpose]);
        const fullTranscript = `Agent: ${agentMessage}\nCustomer: ${customerResponse}`;
        setTranscript(fullTranscript);
        setIsLoading(false);
    };

    const handleAnalyze = async () => {
        if (!transcript) return;
        setIsAnalyzing(true);
        try {
            const result = await geminiService.analyzeConversation(transcript);
            if (result) {
                setAnalysis(result);
                addNotification('Analysis successful!', 'info');
            } else {
                addNotification('Failed to analyze conversation.', 'error');
            }
        } catch (e) {
            addNotification('An error occurred during analysis.', 'error');
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const handleSaveAndClose = () => {
        if (analysis) {
            onSave(client.id, analysis, transcript, purpose);
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-center items-start pt-16 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-6 border-b border-slate-200">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Simulate AI Call</h2>
                        <p className="text-slate-500">To: {client.name}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <label htmlFor="purpose" className="block text-sm font-medium text-slate-700 mb-1">Purpose of Call</label>
                        <select
                            id="purpose"
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value as PurposeKey)}
                            disabled={isLoading || !!transcript}
                            className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition disabled:bg-slate-100"
                        >
                            {Object.keys(callPurposes).map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    {!transcript && (
                        <button onClick={handleStartCall} disabled={isLoading} className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition disabled:opacity-50">
                            {isLoading ? 'Generating...' : 'Start Simulated Call'}
                        </button>
                    )}

                    {isLoading && (
                         <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
                            <p className="mt-2 text-slate-500">AI is generating the conversation...</p>
                        </div>
                    )}
                    
                    {transcript && (
                        <div className="space-y-4">
                            <h3 className="font-semibold text-slate-800">Conversation Transcript</h3>
                             <div className="bg-slate-50 p-4 rounded-lg space-y-4 max-h-60 overflow-y-auto">
                                {transcript.split('\n').map((line, i) => (
                                    <div key={i} className={`flex items-start gap-3 ${line.startsWith('Customer:') ? 'justify-end' : ''}`}>
                                        {line.startsWith('Agent:') && <div className="flex-shrink-0 bg-indigo-500 rounded-full h-8 w-8 flex items-center justify-center"><BotIcon className="h-5 w-5 text-white" /></div>}
                                        <div className={`p-3 rounded-lg max-w-md ${line.startsWith('Agent:') ? 'bg-indigo-100 text-slate-800 rounded-bl-none' : 'bg-green-100 text-slate-800 rounded-br-none'}`}>
                                            <p>{line.substring(line.indexOf(':') + 2)}</p>
                                        </div>
                                        {line.startsWith('Customer:') && <div className="flex-shrink-0 bg-green-500 rounded-full h-8 w-8 flex items-center justify-center"><UserIcon className="h-5 w-5 text-white" /></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {transcript && !analysis && (
                        <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-sm transition disabled:opacity-50">
                            <SparklesIcon className="h-5 w-5 mr-2" />
                            {isAnalyzing ? 'Analyzing...' : 'Analyze Conversation'}
                        </button>
                    )}

                    {isAnalyzing && (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                            <p className="mt-2 text-slate-500">AI is analyzing the transcript...</p>
                        </div>
                    )}

                    {analysis && <AnalysisDisplay analysis={analysis} />}
                </div>

                <footer className="flex justify-end items-center p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                    <button type="button" onClick={onClose} className="bg-white hover:bg-slate-100 text-slate-700 font-semibold py-2 px-6 rounded-lg border border-slate-300 mr-3 transition">Cancel</button>
                    <button type="button" onClick={handleSaveAndClose} disabled={!analysis} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Save Analysis
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CallSimulationModal;
