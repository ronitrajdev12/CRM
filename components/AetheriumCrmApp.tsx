import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Client, Notification, ActionItem, CallAnalysisData } from '../types';
import { PaymentStatus, Sentiment, InquiryType } from '../types';
import { useClientData } from '../hooks/useClientData';
import { formatCurrency } from '../utils/formatting';
import ClientTable from './ClientTable';
import ClientFormModal from './ClientFormModal';
import CallSimulationModal from './CallSimulationModal';
import NotificationPanel from './NotificationPanel';
import PlusIcon from './icons/PlusIcon';
import FileDownIcon from './icons/FileDownIcon';
import LeadCaptureForm from './LeadCaptureForm';
import DashboardMetrics from './DashboardMetrics';
import ActionItems from './ActionItems';

declare const XLSX: any;

const AetheriumCrmApp: React.FC = () => {
    const [clients, setClients] = useClientData();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);
    const [isCallModalOpen, setIsCallModalOpen] = useState(false);
    const [callingClient, setCallingClient] = useState<Client | null>(null);

    useEffect(() => {
        // This is a one-time check for developers to see if the API key is missing.
        if (typeof process === 'undefined' || !process.env.API_KEY) {
            console.warn(
                '******************************************************************\n' +
                '* WARNING: Google AI API Key is not configured.                  *\n' +
                '* AI features will not work. Please set the API_KEY              *\n' +
                '* environment variable to enable full functionality.           *\n' +
                '******************************************************************'
            );
        }
    }, []);

    const addNotification = useCallback((message: string, type: 'info' | 'warning' | 'error') => {
        const newNotification: Notification = { id: Date.now().toString(), message, type };
        setNotifications(prev => [newNotification, ...prev]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
    }, []);

    const actionItems = useMemo<ActionItem[]>(() => {
        const items: ActionItem[] = [];
        const now = new Date();

        clients.forEach(client => {
            if (client.paymentStatus === PaymentStatus.Overdue) {
                items.push({
                    id: `${client.id}-overdue`,
                    type: 'overdue',
                    message: `Payment of ${formatCurrency(client.paymentDue)} is overdue.`,
                    clientId: client.id,
                    clientName: client.name
                });
            }
            
            const lastContactDate = new Date(client.lastContactDate);
            const daysSinceContact = (now.getTime() - lastContactDate.getTime()) / (1000 * 3600 * 24);
            if (client.sentiment === Sentiment.Negative && daysSinceContact > 7) {
                 items.push({
                    id: `${client.id}-feedback`,
                    type: 'feedback',
                    message: `Address negative feedback.`,
                    clientId: client.id,
                    clientName: client.name
                });
            }

            if (client.paymentStatus === PaymentStatus.NewLead && client.inquiryDate) {
                const inquiryDate = new Date(client.inquiryDate);
                const daysSinceInquiry = (now.getTime() - inquiryDate.getTime()) / (1000 * 3600 * 24);
                if (daysSinceInquiry > 2) {
                    items.push({
                        id: `${client.id}-follow-up`,
                        type: 'follow-up',
                        message: `Follow up with new lead.`,
                        clientId: client.id,
                        clientName: client.name
                    });
                }
            }
        });

        return items.sort((a,b) => a.type.localeCompare(b.type)).slice(0, 5); // Limit to top 5 action items
    }, [clients]);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingClient(null);
    }, []);

    const handleFormSubmit = useCallback((clientData: Client) => {
        setClients(currentClients => {
            const isEditing = currentClients.some(c => c.id === clientData.id);
            if (isEditing) {
                addNotification('Client updated successfully!', 'info');
                return currentClients.map(c => c.id === clientData.id ? clientData : c);
            } else {
                addNotification('New client added successfully!', 'info');
                return [clientData, ...currentClients];
            }
        });

        if (clientData.paymentStatus === PaymentStatus.Overdue) {
            addNotification(`Payment for ${clientData.name} is overdue.`, 'warning');
        }
        if (clientData.sentiment === Sentiment.Negative) {
            addNotification(`Negative feedback received from ${clientData.name}.`, 'error');
        }
        
        closeModal();
    }, [addNotification, closeModal, setClients]);

    const handleLeadSubmit = useCallback((newLead: Client) => {
        setClients(prevClients => [newLead, ...prevClients]);
        addNotification(`New lead "${newLead.name}" captured! AI classified as ${newLead.inquiryType}.`, 'info');
    }, [addNotification, setClients]);

    const handleEdit = useCallback((client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    }, []);

    const handleDelete = useCallback((clientId: string) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            setClients(prevClients => prevClients.filter(c => c.id !== clientId));
            addNotification('Client deleted.', 'info');
        }
    }, [addNotification, setClients]);

    const openAddModal = useCallback(() => {
        setEditingClient(null);
        setIsModalOpen(true);
    }, []);

    const exportToExcel = useCallback(() => {
        const worksheet = XLSX.utils.json_to_sheet(clients);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
        XLSX.writeFile(workbook, "Aetherium_CRM_Export.xlsx");
        addNotification('Data exported to Excel.', 'info');
    }, [clients, addNotification]);

     const handleActionClick = useCallback((clientId: string) => {
        const clientToEdit = clients.find(c => c.id === clientId);
        if (clientToEdit) {
            handleEdit(clientToEdit);
        }
    }, [clients, handleEdit]);
    
    // Call Simulation Handlers
    const handleOpenCallModal = (client: Client) => {
        setCallingClient(client);
        setIsCallModalOpen(true);
    };

    const handleCloseCallModal = () => {
        setCallingClient(null);
        setIsCallModalOpen(false);
    };

    const handleSaveCallAnalysis = (clientId: string, analysis: CallAnalysisData, transcript: string, purpose: string) => {
        setClients(prevClients => 
            prevClients.map(client => {
                if (client.id === clientId) {
                    addNotification(`Call analysis for ${client.name} saved.`, 'info');
                    return {
                        ...client,
                        lastCall: {
                            date: new Date().toISOString(),
                            purpose: purpose,
                            transcript: transcript,
                            summary: analysis.summary,
                            sentiment: analysis.sentiment,
                            keyPoints: analysis.keyPoints,
                            feedback: analysis.feedback,
                        },
                        sentiment: analysis.sentiment, // Update client's main sentiment
                        lastContactDate: new Date().toISOString().split('T')[0], // Update last contact date
                    };
                }
                return client;
            })
        );
        handleCloseCallModal();
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <NotificationPanel notifications={notifications} onDismiss={(id) => setNotifications(notifications.filter(n => n.id !== id))} />

            <header className="bg-white shadow-sm sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                         <a href="#/marketing" className="text-2xl font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                            Aetherium <span className="text-indigo-600">CRM</span>
                        </a>
                        <div className="flex items-center space-x-3">
                            <button onClick={exportToExcel} className="hidden sm:flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                                <FileDownIcon className="h-5 w-5 mr-2" />
                                Export
                            </button>
                            <button onClick={openAddModal} className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition-transform transform hover:scale-105">
                                <PlusIcon className="h-5 w-5 mr-2" />
                                Add Client
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <DashboardMetrics clients={clients} />
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ClientTable clients={clients} onEdit={handleEdit} onDelete={handleDelete} onCall={handleOpenCallModal} />
                    </div>
                    <div className="lg:col-span-1 space-y-8">
                        <ActionItems items={actionItems} onActionClick={handleActionClick} />
                        <LeadCaptureForm onLeadSubmit={handleLeadSubmit} />
                    </div>
                </div>
            </main>

            {isModalOpen && (
                <ClientFormModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleFormSubmit}
                    initialData={editingClient}
                    addNotification={addNotification}
                />
            )}
            
            {isCallModalOpen && callingClient && (
                <CallSimulationModal
                    isOpen={isCallModalOpen}
                    onClose={handleCloseCallModal}
                    client={callingClient}
                    onSave={handleSaveCallAnalysis}
                    addNotification={addNotification}
                />
            )}
        </div>
    );
};

export default AetheriumCrmApp;