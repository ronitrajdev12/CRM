import React, { useState, useRef, useEffect, useCallback } from 'react';
import MainLayout from './MainLayout';
import { analyzeCallRecording } from '../services/geminiService';
import type { CallAnalysis } from '../types';
import { Sentiment } from '../types';
import MicrophoneIcon from './icons/MicrophoneIcon';
import StopCircleIcon from './icons/StopCircleIcon';
import UploadCloudIcon from './icons/UploadCloudIcon';
import SparklesIcon from './icons/SparklesIcon';
import LightbulbIcon from './icons/LightbulbIcon';
import HashIcon from './icons/HashIcon';
import ListChecksIcon from './icons/ListChecksIcon';
import FileTextIcon from './icons/FileTextIcon';


const SentimentPill: React.FC<{ sentiment: Sentiment }> = ({ sentiment }) => {
    const baseClasses = 'px-3 py-1 text-base font-bold rounded-full';
    switch (sentiment) {
        case Sentiment.Positive: return <span className={`${baseClasses} bg-green-100 text-green-800`}>Positive</span>;
        case Sentiment.Neutral: return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Neutral</span>;
        case Sentiment.Negative: return <span className={`${baseClasses} bg-red-100 text-red-800`}>Negative</span>;
        default: return <span className={`${baseClasses} bg-slate-100 text-slate-800`}>N/A</span>;
    }
};

const AnalysisResult: React.FC<{ analysis: CallAnalysis }> = ({ analysis }) => (
    <div className="space-y-8">
        {/* Summary and Sentiment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                    <LightbulbIcon className="h-6 w-6 text-yellow-500 mr-3"/>
                    <h3 className="text-xl font-bold text-slate-800">Summary</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{analysis.summary}</p>
            </div>
             <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Overall Sentiment</h3>
                <SentimentPill sentiment={analysis.sentiment} />
            </div>
        </div>

        {/* Topics and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                    <HashIcon className="h-6 w-6 text-blue-500 mr-3"/>
                    <h3 className="text-xl font-bold text-slate-800">Key Topics</h3>
                </div>
                <ul className="space-y-2">
                    {analysis.keyTopics.map((topic, i) => <li key={i} className="bg-blue-50 text-blue-800 rounded-md px-3 py-1">{topic}</li>)}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                    <ListChecksIcon className="h-6 w-6 text-indigo-500 mr-3"/>
                    <h3 className="text-xl font-bold text-slate-800">Action Items</h3>
                </div>
                 <ul className="space-y-3 list-disc list-inside text-slate-600">
                    {analysis.actionItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>

        {/* Transcript */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center mb-4">
                <FileTextIcon className="h-6 w-6 text-slate-500 mr-3"/>
                <h3 className="text-xl font-bold text-slate-800">Transcript</h3>
            </div>
            <div className="prose prose-slate max-w-none bg-slate-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <p className="text-slate-900">{analysis.transcript}</p>
            </div>
        </div>
    </div>
);

const CallAnalyzerPage: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<CallAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const cleanup = useCallback(() => {
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    }, [audioUrl]);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    const resetState = () => {
        setAudioBlob(null);
        setAudioUrl(null);
        setAnalysis(null);
        setError(null);
        cleanup();
    };

    const handleStartRecording = async () => {
        resetState();
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    setAudioBlob(blob);
                    setAudioUrl(URL.createObjectURL(blob));
                    stream.getTracks().forEach(track => track.stop());
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Error accessing microphone:", err);
                setError("Microphone access was denied. Please allow microphone access in your browser settings and try again.");
            }
        } else {
            setError("Your browser does not support audio recording.");
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('audio/')) {
            resetState();
            setAudioBlob(file);
            setAudioUrl(URL.createObjectURL(file));
        } else {
            setError("Please upload a valid audio file.");
        }
    };

    const handleAnalyze = async () => {
        if (!audioBlob) return;
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        
        try {
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
                try {
                    const base64Audio = (reader.result as string).split(',')[1];
                    const result = await analyzeCallRecording(base64Audio, audioBlob.type);
                    if (result) {
                        setAnalysis(result);
                    } else {
                        setError('Failed to analyze the audio. The model could not process the request.');
                    }
                } catch(e) {
                     console.error(e);
                     setError('An unexpected error occurred during analysis.');
                } finally {
                    setIsLoading(false);
                }
            };
            reader.onerror = () => {
                setError('Failed to read the audio file.');
                setIsLoading(false);
            };
        } catch (e) {
            console.error(e);
            setError('An unexpected error occurred during analysis.');
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        AI Call Review Analyzer
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Upload or record a customer call to get an instant, AI-powered analysis including a transcript, summary, sentiment, and actionable insights.
                    </p>
                </div>
                
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={isRecording ? handleStopRecording : handleStartRecording}
                            className={`flex items-center justify-center w-full sm:w-auto text-white font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {isRecording ? <StopCircleIcon className="h-6 w-6 mr-2" /> : <MicrophoneIcon className="h-6 w-6 mr-2" />}
                            {isRecording ? 'Stop Recording' : 'Record Audio'}
                        </button>
                        <span className="text-slate-400 font-semibold hidden sm:block">OR</span>
                        <label htmlFor="audio-upload" className="flex items-center justify-center w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-lg cursor-pointer transition">
                            <UploadCloudIcon className="h-6 w-6 mr-2"/>
                            Upload File
                        </label>
                        <input id="audio-upload" type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
                    </div>

                    {audioUrl && (
                        <div className="mt-8 pt-6 border-t border-slate-200">
                            <p className="text-center font-semibold text-slate-700 mb-2">Your Recording:</p>
                            <audio src={audioUrl} controls className="w-full mb-4" />
                            <button
                                onClick={handleAnalyze}
                                disabled={!audioBlob || isLoading || isRecording}
                                className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SparklesIcon className="h-6 w-6 mr-2" />
                                {isLoading ? 'Analyzing...' : 'Analyze Recording'}
                            </button>
                        </div>
                    )}
                </div>

                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-slate-600 font-semibold">Analyzing your call... This may take a moment.</p>
                    </div>
                )}
                {error && (
                    <div className="max-w-3xl mx-auto mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{error}</p>
                    </div>
                )}
                {analysis && !isLoading && (
                     <div className={`max-w-4xl mx-auto mt-12 transition-opacity duration-700 ${analysis ? 'opacity-100' : 'opacity-0'}`}>
                        <AnalysisResult analysis={analysis} />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default CallAnalyzerPage;