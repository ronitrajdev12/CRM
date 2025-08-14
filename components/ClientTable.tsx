import React, { useState, useMemo } from 'react';
import type { Client } from '../types';
import { PaymentStatus, Sentiment, RiskLevel } from '../types';
import PhoneIcon from './icons/PhoneIcon';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';

interface ClientTableProps {
    clients: Client[];
    onCall?: (client: Client) => void;
    onEdit?: (client: Client) => void;
    onDelete?: (clientId: string) => void;
}

const getSentimentPillColor = (sentiment?: Sentiment) => {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
    switch (sentiment) {
        case Sentiment.Positive: return <span className={`${baseClasses} bg-green-100 text-green-700`}>Positive</span>;
        case Sentiment.Neutral: return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Neutral</span>;
        case Sentiment.Negative: return <span className={`${baseClasses} bg-red-100 text-red-700`}>Negative</span>;
        default: return <span className="text-slate-400">N/A</span>;
    }
};

const getRiskPillColor = (risk?: RiskLevel) => {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full';
    switch (risk) {
        case RiskLevel.Low: return <span className={`${baseClasses} bg-green-100 text-green-700`}>Low</span>;
        case RiskLevel.High: return <span className={`${baseClasses} bg-red-100 text-red-700`}>High</span>;
        default: return <span className="text-slate-400">N/A</span>;
    }
};

const getStatusPillColor = (status: PaymentStatus) => {
    const baseClasses = 'px-3 py-1 text-sm font-medium rounded-full inline-block';
     switch (status) {
        case PaymentStatus.Paid: return <span className={`${baseClasses} bg-green-100 text-green-700`}>Paid</span>;
        case PaymentStatus.Due: return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Due</span>;
        case PaymentStatus.Overdue: return <span className={`${baseClasses} bg-red-100 text-red-700`}>Overdue</span>;
        case PaymentStatus.Partial: return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Partial</span>;
        case PaymentStatus.NewLead: return <span className={`${baseClasses} bg-slate-200 text-slate-800`}>New Lead</span>;
        default: return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
};

const ClientTableRow: React.FC<{ client: Client, onCall?: (client: Client) => void, onEdit?: (client: Client) => void, onDelete?: (clientId: string) => void }> = ({ client, onCall, onEdit, onDelete }) => (
    <tr className="border-b border-slate-200 hover:bg-slate-50/50 transition-colors duration-200">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="font-semibold text-slate-900">{client.name}</div>
            <div className="text-sm text-slate-500">{client.email}</div>
            <div className="text-sm text-slate-500">{client.phone}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{client.inquiryType}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{new Date(client.lastContactDate).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">₹{client.paymentDue.toLocaleString()}</td>
        <td className="px-6 py-4 whitespace-nowrap">{getStatusPillColor(client.paymentStatus)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{getSentimentPillColor(client.sentiment)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{getRiskPillColor(client.paymentRisk)}</td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
            {onCall && (
                <button onClick={() => onCall(client)} className="text-indigo-600 hover:text-indigo-900 transition-colors p-2 rounded-full hover:bg-indigo-100" title="Simulate AI Call">
                    <PhoneIcon className="h-5 w-5" />
                </button>
            )}
            {onEdit && (
                 <button onClick={() => onEdit(client)} className="text-slate-600 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-100" title="Edit Client">
                    <EditIcon className="h-5 w-5" />
                </button>
            )}
            {onDelete && (
                <button onClick={() => onDelete(client.id)} className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-full hover:bg-red-100" title="Delete Client">
                    <TrashIcon className="h-5 w-5" />
                </button>
            )}
        </td>
    </tr>
);

const ClientTable: React.FC<ClientTableProps> = ({ clients, onCall, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredClients = useMemo(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (!lowerCaseSearchTerm) return clients;
        return clients.filter(client =>
            client.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            client.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            client.phone.toLowerCase().includes(lowerCaseSearchTerm) ||
            client.inquiryType.toLowerCase().includes(lowerCaseSearchTerm)
        );
    }, [clients, searchTerm]);

    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
             <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800">Client Database</h3>
                    <p className="text-slate-500 mt-1">Search, sort, and manage all your clients.</p>
                </div>
                <div className="w-full sm:w-auto sm:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search by name, email, phone, or inquiry type..."
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Inquiry Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Contact</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Due</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sentiment</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Risk</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {filteredClients.length > 0 ? (
                            filteredClients.map(client => (
                                <ClientTableRow key={client.id} client={client} onCall={onCall} onEdit={onEdit} onDelete={onDelete} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center py-12 text-slate-500">
                                    <h4 className="font-semibold">No clients found.</h4>
                                    <p>Try adjusting your search term.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientTable;