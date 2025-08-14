import React, { useState, useEffect } from 'react';
import MainLayout from './MainLayout';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { GalleryItem } from '../types';
import TrashIcon from './icons/TrashIcon';
import ImageIcon from './icons/ImageIcon';
import FilmIcon from './icons/FilmIcon';
import XIcon from './icons/XIcon';


const VideoPlayerModal: React.FC<{ item: GalleryItem, onClose: () => void }> = ({ item, onClose }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isMockVideo = item.data === 'mock-video-placeholder';

    useEffect(() => {
        let isMounted = true;
        let objectUrl: string | null = null;

        const fetchVideo = async () => {
            if (isMockVideo) {
                setError('Live playback is disabled for demo videos.');
                setIsLoading(false);
                return;
            }

            const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : null;

            if (!apiKey) {
                setError("API Key is not configured. Cannot play video.");
                setIsLoading(false);
                return;
            }
            
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`${item.data}&key=${apiKey}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch video: ${response.statusText}`);
                }
                const blob = await response.blob();
                if (isMounted) {
                    objectUrl = URL.createObjectURL(blob);
                    setVideoUrl(objectUrl);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Unknown error fetching video.');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchVideo();

        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [item, isMockVideo]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h3 className="font-semibold text-slate-800 truncate" title={item.prompt}>{item.prompt}</h3>
                    <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                </header>
                <div className="aspect-video bg-slate-900 flex justify-center items-center rounded-b-2xl">
                    {isLoading && (
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-400 mx-auto"></div>
                            <p className="mt-3">Loading video...</p>
                        </div>
                    )}
                    {error && !isLoading && (
                         <div className="text-red-400 text-center p-4">
                            <p className="font-bold">Could not play video</p>
                            <p>{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && videoUrl && (
                        <video src={videoUrl} controls autoPlay className="w-full h-full rounded-b-2xl bg-black" />
                    )}
                </div>
            </div>
        </div>
    );
};


const GalleryPage: React.FC = () => {
    const [gallery, setGallery] = useLocalStorage<GalleryItem[]>('ai-media-gallery', []);
    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [playingVideo, setPlayingVideo] = useState<GalleryItem | null>(null);


    const filteredGallery = gallery.filter(item => {
        if (filter === 'all') return true;
        return item.type === filter;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this item forever?')) {
            setGallery(prev => prev.filter(item => item.id !== id));
        }
    };

    const handleItemClick = (e: React.MouseEvent, item: GalleryItem) => {
        if (item.type === 'video') {
            e.preventDefault();
            setPlayingVideo(item);
        }
    }

    return (
        <MainLayout bgClass="bg-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        AI Media Gallery
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
                        Browse, view, and manage all of your AI-generated images and videos.
                    </p>
                </div>
                
                <div className="flex justify-center items-center gap-4 mb-8">
                     <button onClick={() => setFilter('all')} className={`px-4 py-2 font-semibold rounded-lg transition ${filter === 'all' ? 'bg-indigo-600 text-white shadow' : 'bg-white hover:bg-slate-200'}`}>All</button>
                     <button onClick={() => setFilter('image')} className={`px-4 py-2 font-semibold rounded-lg transition ${filter === 'image' ? 'bg-indigo-600 text-white shadow' : 'bg-white hover:bg-slate-200'}`}>Images</button>
                     <button onClick={() => setFilter('video')} className={`px-4 py-2 font-semibold rounded-lg transition ${filter === 'video' ? 'bg-indigo-600 text-white shadow' : 'bg-white hover:bg-slate-200'}`}>Videos</button>
                </div>

                {filteredGallery.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredGallery.map((item) => (
                            <div key={item.id} className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                <a href={item.type === 'image' ? item.data : '#'} onClick={(e) => handleItemClick(e, item)} target={item.type === 'image' ? '_blank' : '_self'} rel="noopener noreferrer" className="block relative aspect-square w-full cursor-pointer">
                                    {item.type === 'image' ? (
                                        <>
                                            <img src={item.data} alt={item.prompt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-white text-lg font-bold">Open Image</p>
                                            </div>
                                            <div className="absolute top-2 left-2 bg-black/50 text-white p-1.5 rounded-full">
                                                <ImageIcon className="h-5 w-5" />
                                            </div>
                                        </>
                                    ) : ( // Video
                                        <>
                                            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                                <FilmIcon className="h-16 w-16 text-slate-500" />
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <p className="text-white text-lg font-bold">Play Video</p>
                                            </div>
                                            <div className="absolute top-2 left-2 bg-black/50 text-white p-1.5 rounded-full">
                                                <FilmIcon className="h-5 w-5" />
                                            </div>
                                        </>
                                    )}
                                </a>
                                <div className="p-4 flex flex-col flex-grow">
                                    <p className="text-sm text-slate-500 truncate" title={item.prompt}>{item.prompt}</p>
                                    <div className="flex justify-between items-center mt-auto pt-2">
                                         <p className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
                                         <button onClick={(e) => handleDelete(e, item.id)} className="text-slate-400 hover:text-red-500 transition p-1 rounded-full"><TrashIcon className="h-4 w-4"/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold text-slate-800">Your gallery is empty.</h2>
                        <p className="mt-2 text-slate-500">Go to the <a href="#/products/image-generator" className="text-indigo-600 font-semibold">Image Generator</a> or <a href="#/products/video-generator" className="text-indigo-600 font-semibold">Video Generator</a> to create something new!</p>
                    </div>
                )}
            </div>
            {playingVideo && <VideoPlayerModal item={playingVideo} onClose={() => setPlayingVideo(null)} />}
        </MainLayout>
    );
};

export default GalleryPage;