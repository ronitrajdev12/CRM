import React, { useState, useEffect, useCallback, useRef } from 'react';
import MainLayout from './MainLayout';
import * as geminiService from '../services/geminiService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { GalleryItem } from '../types';
import ClapperboardIcon from './icons/ClapperboardIcon';
import FilmIcon from './icons/FilmIcon';
import SparklesIcon from './icons/SparklesIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const loadingMessages = [
    "Sending prompt to the video model...",
    "AI is warming up the virtual cameras...",
    "Rendering the first few frames...",
    "This can take a few minutes, thank you for your patience.",
    "Compositing scenes and adding digital effects...",
    "Adding sound and final touches...",
    "Finalizing the video file, almost there!",
];

const VideoGeneratorPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [gallery, setGallery] = useLocalStorage<GalleryItem[]>('ai-media-gallery', []);

    const pollingIntervalRef = useRef<number | null>(null);
    const loadingMessageIntervalRef = useRef<number | null>(null);

    const stopProcesses = useCallback(() => {
        if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
        }
        if (loadingMessageIntervalRef.current) {
            clearInterval(loadingMessageIntervalRef.current);
            loadingMessageIntervalRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopProcesses();
        };
    }, [stopProcesses]);

    const handleGenerateVideo = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate a video.');
            return;
        }
        
        setIsSuccess(false);
        setIsLoading(true);
        setError(null);
        stopProcesses();

        let messageIndex = 0;
        setLoadingMessage(loadingMessages[messageIndex]);
        loadingMessageIntervalRef.current = window.setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            setLoadingMessage(loadingMessages[messageIndex]);
        }, 5000); // Slower interval for video

        try {
            let operation = await geminiService.generateVideo(prompt);

            const poll = async () => {
                try {
                    operation = await geminiService.getVideoOperationStatus(operation);
                    if (operation.done) {
                        stopProcesses();
                        setIsLoading(false);
                        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
                        
                        if (downloadLink) {
                            const newItem: GalleryItem = {
                                id: `video_${Date.now()}`,
                                type: 'video',
                                prompt: prompt,
                                timestamp: new Date().toISOString(),
                                data: downloadLink
                            };
                            setGallery(prev => [newItem, ...prev]);
                            setIsSuccess(true);
                        } else {
                            setError('Video generation completed, but no download link was found. The prompt might have been rejected for safety reasons.');
                        }
                        setLoadingMessage('');
                    }
                } catch (err) {
                    stopProcesses();
                    setError(err instanceof Error ? err.message : 'An unknown polling error occurred.');
                    setIsLoading(false);
                }
            };
            
            // Start polling
            pollingIntervalRef.current = window.setInterval(poll, 10000);

        } catch (err) {
            stopProcesses();
            setError(err instanceof Error ? err.message : 'An unknown error occurred during video generation.');
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
                        <FilmIcon className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        AI Video Generator
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Bring your ideas to life. Describe a scene, an object, or a story, and our AI will generate a short video clip for you.
                    </p>
                </div>
                
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                    <div className="space-y-4">
                        <label htmlFor="prompt-input" className="block text-lg font-bold text-slate-700">
                            Enter your video prompt
                        </label>
                        <textarea
                            id="prompt-input"
                            rows={4}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                            placeholder="e.g., A majestic lion waking up at sunrise on the savannah"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleGenerateVideo}
                            disabled={isLoading || !prompt.trim()}
                            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                            <SparklesIcon className="h-6 w-6 mr-2" />
                            {isLoading ? 'Generating Video...' : 'Generate Video'}
                        </button>
                    </div>
                </div>

                {isLoading && (
                    <div className="text-center py-12 max-w-3xl mx-auto">
                        <div className="animate-pulse mb-4">
                            <ClapperboardIcon className="h-16 w-16 text-indigo-400 mx-auto" />
                        </div>
                        <p className="mt-4 text-slate-600 font-semibold text-lg">{loadingMessage}</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-3xl mx-auto mt-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg" role="alert">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{error}</p>
                    </div>
                )}

                {isSuccess && !isLoading && (
                    <div className="max-w-3xl mx-auto mt-12 text-center bg-green-50 border-2 border-green-200 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-green-800">Video Generation Complete!</h2>
                        <p className="text-green-700 mb-6">Your new video has been added to the gallery. Click the button below to view it.</p>
                        <a
                            href="#/products/gallery"
                            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            View in Gallery
                            <ArrowRightIcon className="h-5 w-5 ml-2" />
                        </a>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default VideoGeneratorPage;