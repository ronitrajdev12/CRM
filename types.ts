
import React from 'react';
import type { GenerateContentResponse } from '@google/genai';

export enum PaymentStatus {
  Paid = 'Paid',
  Due = 'Due',
  Overdue = 'Overdue',
  Partial = 'Partial',
  NewLead = 'New Lead',
}

export enum InquiryType {
  Sales = 'Sales',
  Support = 'Support',
  General = 'General',
}

export enum Sentiment {
  Positive = 'Positive',
  Neutral = 'Neutral',
  Negative = 'Negative',
}

export enum RiskLevel {
  Low = 'Low',
  High = 'High',
}

export interface CallAnalysisData {
  summary: string;
  sentiment: Sentiment;
  keyPoints: string[];
  feedback: string;
}

export interface CallAnalysis {
  summary: string;
  sentiment: Sentiment;
  keyTopics: string[];
  actionItems: string[];
  transcript: string;
}


export interface Client {
  id: string;
  name:string;
  phone: string;
  email: string;
  inquiryType: InquiryType;
  lastContactDate: string; // YYYY-MM-DD
  paymentDue: number;
  paymentStatus: PaymentStatus;
  sentiment?: Sentiment;
  paymentRisk?: RiskLevel;
  lastCall?: CallAnalysisData & {
    date: string; // ISO string
    purpose: string;
    transcript: string;
  };
  inquiryDescription?: string;
  inquiryDate?: string; // YYYY-MM-DD
  totalPayment?: number;
  feedback?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error';
}

export interface ActionItem {
    id: string;
    type: 'overdue' | 'follow-up' | 'feedback';
    message: string;
    clientId: string;
    clientName: string;
}

export interface Author {
    name: string;
    title: string;
    avatar: React.ReactElement;
}

export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: Author;
    date: string;
    image: React.ReactElement;
}

export interface CaseStudy {
    slug: string;
    clientName: string;
    clientLogo: React.ReactElement;
    title: string;
    summary: string;
    challenge: string;
    solution: string;
    results: {
        value: string;
        label: string;
        icon: React.ReactElement;
    }[];
    testimonial: {
        quote: string;
        authorName: string;
        authorTitle: string;
    };
    image: React.ReactElement;
}

export interface GalleryItem {
    id: string;
    type: 'image' | 'video';
    prompt: string;
    timestamp: string; // ISO string
    data: string; // base64 for image, URI for video
}

// This represents the response from the mock image generation service
export interface ImageGenerationResponse {
  generatedImages: {
    image: {
      imageBytes: string; // Base64 encoded string
    };
  }[];
}

// This represents the operation object from the mock video generation service
export interface VideoGenerationOperation {
    name: string;
    done: boolean;
    response?: {
        generatedVideos?: {
            video?: {
                uri: string;
            };
        }[];
    };
}
