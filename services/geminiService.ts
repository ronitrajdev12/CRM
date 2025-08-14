import { GoogleGenAI, Type } from '@google/genai';
import type { Client, CallAnalysisData, CallAnalysis, ImageGenerationResponse, VideoGenerationOperation } from '../types';
import { InquiryType, Sentiment, RiskLevel } from '../types';

// --- Gemini API Service ---
// This service uses the @google/genai SDK to make real calls to the Google Gemini API.
// IMPORTANT: This requires the `API_KEY` environment variable to be set correctly.
// Direct API calls from the browser are generally not recommended for production apps
// due to security risks. A backend proxy is the standard approach.

const API_KEY = typeof process !== 'undefined' && process.env.API_KEY ? process.env.API_KEY : null;

if (!API_KEY) {
    console.error("Aetherium CRM Warning: The 'API_KEY' environment variable is not set. AI features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const handleApiError = (error: unknown, featureName: string): any => {
    console.error(`Error in ${featureName}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown AI error occurred.';
    throw new Error(`AI Error in ${featureName}: ${errorMessage}`);
};


// --- Text Generation ---

export const generateCustomerResponse = async (client: Client, purpose: string): Promise<string> => {
    if (!ai) return "AI features are disabled. Please configure your API key.";
    try {
        const prompt = `Role-play as a customer with this profile:
        - Name: ${client.name}
        - Last interaction sentiment: ${client.sentiment || 'Neutral'}
        - Payment status: ${client.paymentStatus}
        
        An AI assistant is calling to: "${purpose}".
        
        Write a short, realistic, and conversational opening line from the customer's perspective. Behave according to the profile. For example, if sentiment was negative or payment is overdue, be slightly annoyed. If positive, be friendly.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.9, topP: 0.95 }
        });
        return response.text;
    } catch (e) {
        return handleApiError(e, 'generateCustomerResponse');
    }
};

// --- JSON-based Analysis Schemas ---

const callAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the conversation in one or two sentences.' },
        sentiment: { type: Type.STRING, enum: Object.values(Sentiment), description: 'The overall sentiment of the customer.' },
        keyPoints: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of 3-4 key topics or points discussed.' },
        feedback: { type: Type.STRING, description: 'Any specific, actionable feedback the customer provided. If none, state that.' }
    },
    required: ['summary', 'sentiment', 'keyPoints', 'feedback'],
};

const inquiryTypeSchema = {
    type: Type.OBJECT,
    properties: { inquiryType: { type: Type.STRING, enum: Object.values(InquiryType) } },
    required: ['inquiryType']
};

const sentimentSchema = {
    type: Type.OBJECT,
    properties: { sentiment: { type: Type.STRING, enum: Object.values(Sentiment) } },
    required: ['sentiment']
};

const riskLevelSchema = {
    type: Type.OBJECT,
    properties: { riskLevel: { type: Type.STRING, enum: Object.values(RiskLevel) } },
    required: ['riskLevel']
};

// --- JSON-based Analysis Functions ---

export const analyzeConversation = async (transcript: string): Promise<CallAnalysisData> => {
    if (!ai) throw new Error("AI service not configured.");
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the following call transcript and provide a structured JSON analysis.\n\nTranscript:\n${transcript}`,
            config: { responseMimeType: "application/json", responseSchema: callAnalysisSchema }
        });
        return JSON.parse(response.text);
    } catch (e) {
        return handleApiError(e, 'analyzeConversation');
    }
};

export const suggestInquiryType = async (description: string): Promise<InquiryType> => {
    if (!ai) return InquiryType.General;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Classify this customer inquiry: "${description}"`,
            config: { responseMimeType: "application/json", responseSchema: inquiryTypeSchema }
        });
        return JSON.parse(response.text).inquiryType;
    } catch (e) {
        return handleApiError(e, 'suggestInquiryType');
    }
};

export const analyzeSentiment = async (feedback: string): Promise<Sentiment> => {
    if (!ai) return Sentiment.Neutral;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Analyze the sentiment of this customer feedback: "${feedback}"`,
            config: { responseMimeType: "application/json", responseSchema: sentimentSchema }
        });
        return JSON.parse(response.text).sentiment;
    } catch (e) {
        return handleApiError(e, 'analyzeSentiment');
    }
};

export const predictPaymentRisk = async (clientData: Partial<Client>): Promise<RiskLevel> => {
    if (!ai) return RiskLevel.Low;
    try {
        const prompt = `Predict the payment risk for a client with this profile:
        - Payment Status: ${clientData.paymentStatus}
        - Recent Sentiment: ${clientData.sentiment || 'N/A'}
        - Payment Due: ${clientData.paymentDue || 0}
        - Total Paid: ${clientData.totalPayment || 0}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: riskLevelSchema }
        });
        return JSON.parse(response.text).riskLevel;
    } catch (e) {
        return handleApiError(e, 'predictPaymentRisk');
    }
};

// --- Multimodal Analysis ---

const callRecordingAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: 'A concise summary of the entire call.' },
        sentiment: { type: Type.STRING, enum: Object.values(Sentiment), description: 'The dominant sentiment of the customer.' },
        keyTopics: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of the main topics discussed.' },
        actionItems: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'A list of clear, actionable next steps.' },
        transcript: { type: Type.STRING, description: 'A full, accurate transcript of the conversation.' }
    },
    required: ['summary', 'sentiment', 'keyTopics', 'actionItems', 'transcript'],
};

export const analyzeCallRecording = async (audioBase64: string, mimeType: string): Promise<CallAnalysis> => {
    if (!ai) throw new Error("AI service not configured.");
    try {
        const audioPart = { inlineData: { data: audioBase64, mimeType } };
        const textPart = { text: "Please transcribe the audio recording and provide a detailed analysis of the conversation. Return the output in the specified JSON format." };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [audioPart, textPart] },
            config: { responseMimeType: "application/json", responseSchema: callRecordingAnalysisSchema }
        });
        return JSON.parse(response.text);
    } catch (e) {
        return handleApiError(e, 'analyzeCallRecording');
    }
};

// --- Multimodal Generation ---

export const generateImage = async (prompt: string): Promise<ImageGenerationResponse> => {
    if (!ai) throw new Error("AI service not configured.");
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: { numberOfImages: 1, outputMimeType: 'image/png' },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            return { generatedImages: [] };
        }
        return {
            generatedImages: [{
                image: { imageBytes: response.generatedImages[0].image.imageBytes }
            }]
        };
    } catch (e) {
        return handleApiError(e, 'generateImage');
    }
};

export const generateVideo = async (prompt: string): Promise<VideoGenerationOperation> => {
    if (!ai) throw new Error("AI service not configured.");
    try {
        const operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: prompt,
            config: { numberOfVideos: 1 },
        });
        return operation as unknown as VideoGenerationOperation;
    } catch (e) {
        return handleApiError(e, 'generateVideo');
    }
};

export const getVideoOperationStatus = async (operation: VideoGenerationOperation): Promise<VideoGenerationOperation> => {
    if (!ai) throw new Error("AI service not configured.");
    try {
        const updatedOperation = await ai.operations.getVideosOperation({ operation: operation as any });
        return updatedOperation as unknown as VideoGenerationOperation;
    } catch (e) {
        return handleApiError(e, 'getVideoOperationStatus');
    }
};