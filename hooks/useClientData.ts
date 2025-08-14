import { useState, useEffect } from 'react';
import type { Client } from '../types';
import { PaymentStatus, InquiryType, Sentiment, RiskLevel } from '../types';

const CLIENTS_STORAGE_KEY = 'aetherium-crm-clients';

const initialClients: Client[] = [
    { id: 'cust_001', name: 'Innovate Corp', phone: '555-0101', email: 'contact@innovate.com', inquiryDescription: 'Interested in enterprise software solutions.', inquiryType: InquiryType.Sales, inquiryDate: '2024-07-10', lastContactDate: '2024-07-15', totalPayment: 5000, paymentDue: 0, paymentStatus: PaymentStatus.Paid, feedback: 'Great onboarding process, very smooth.', sentiment: Sentiment.Positive, paymentRisk: RiskLevel.Low },
    { id: 'cust_002', name: 'Data Systems', phone: '555-0102', email: 'info@datasys.io', inquiryDescription: 'Support ticket regarding API integration issue.', inquiryType: InquiryType.Support, inquiryDate: '2024-07-12', lastContactDate: '2024-07-18', totalPayment: 2500, paymentDue: 2500, paymentStatus: PaymentStatus.Due, feedback: 'The API documentation is a bit confusing.', sentiment: Sentiment.Neutral, paymentRisk: RiskLevel.Low },
    { id: 'cust_003', name: 'QuantumLeap Co', phone: '555-0103', email: 'billing@quantumleap.co', inquiryDescription: 'Question about an invoice from last month.', inquiryType: InquiryType.General, inquiryDate: '2024-06-05', lastContactDate: '2024-07-01', totalPayment: 7500, paymentDue: 1500, paymentStatus: PaymentStatus.Overdue, feedback: 'Service is good, but billing is slow to respond.', sentiment: Sentiment.Negative, paymentRisk: RiskLevel.High }
];

export const useClientData = (): [Client[], React.Dispatch<React.SetStateAction<Client[]>>] => {
    const [clients, setClients] = useState<Client[]>(() => {
        try {
            const savedClients = localStorage.getItem(CLIENTS_STORAGE_KEY);
            return savedClients ? JSON.parse(savedClients) : initialClients;
        } catch (error) {
            console.error("Error reading clients from localStorage", error);
            return initialClients;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(clients));
        } catch (error) {
            console.error("Error writing clients to localStorage", error);
        }
    }, [clients]);

    return [clients, setClients];
};
