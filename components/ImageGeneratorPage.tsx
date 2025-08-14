import React, { useState } from 'react';
import MainLayout from './MainLayout';
import * as geminiService from '../services/geminiService';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { GalleryItem } from '../types';
import ImageIcon from './icons/ImageIcon';
import SparklesIcon from './icons/SparklesIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const ImageGeneratorPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const [gallery, setGallery] = useLocalStorage<GalleryItem[]>('ai-media-gallery', []);

    const handleGenerateImage = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt to generate an image.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedImage(null);

        try {
            const response = await geminiService.generateImage(prompt);
            if (response?.generatedImages?.[0]?.image?.imageBytes) {
                const base64ImageBytes = response.generatedImages[0].image.imageBytes;
                // The live API returns a base64 encoded PNG.
                const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                setGeneratedImage(imageUrl);
                
                const newItem: GalleryItem = {
                    id: `image_${Date.now()}`,
                    type: 'image',
                    prompt: prompt,
                    timestamp: new Date().toISOString(),
                    data: imageUrl,
                };
                setGallery(prev => [newItem, ...prev]);

            } else {
                setError('Image generation failed. The model did not return an image. Your prompt may have been rejected for safety reasons.');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <div className="inline-block bg-indigo-100 p-4 rounded-full mb-4">
                        <ImageIcon className="h-10 w-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        AI Image Generator
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Turn your words into stunning visuals. Describe anything you can imagine, and our AI will bring it to life as a unique image.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Input Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="space-y-4">
                            <label htmlFor="prompt-input" className="block text-lg font-bold text-slate-700">
                                Enter your image prompt
                            </label>
                            <textarea
                                id="prompt-input"
                                rows={4}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                                placeholder="e.g., A photorealistic portrait of an astronaut drinking coffee on Mars"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleGenerateImage}
                                disabled={isLoading || !prompt.trim()}
                                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            >
                                <SparklesIcon className="h-6 w-6 mr-2" />
                                {isLoading ? 'Generating Image...' : 'Generate Image'}
                            </button>
                        </div>
                        {error && (
                            <div className="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
                                <p className="font-bold">An Error Occurred</p>
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Right: Output */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg aspect-square flex flex-col items-center justify-center">
                        {isLoading ? (
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                <p className="mt-4 text-slate-600 font-semibold">Generating your masterpiece...</p>
                            </div>
                        ) : generatedImage ? (
                            <div className="w-full h-full flex flex-col">
                                <img src={generatedImage} alt={prompt} className="w-full h-full object-contain rounded-lg flex-grow"/>
                                <a
                                    href="#/products/gallery"
                                    className="mt-4 w-full text-center inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                >
                                    View in Gallery
                                    <ArrowRightIcon className="h-5 w-5 ml-2" />
                                </a>
                            </div>
                        ) : (
                            <div className="text-center text-slate-400">
                                <ImageIcon className="h-24 w-24 mx-auto" />
                                <p className="mt-4 font-semibold">Your generated image will appear here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ImageGeneratorPage;