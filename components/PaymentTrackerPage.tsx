import React, { useState, useMemo, useCallback } from 'react';
import MainLayout from './MainLayout';
import type { Client, Notification } from '../types';
import { PaymentStatus } from '../types';
import { useClientData } from '../hooks/useClientData';
import { formatCurrency } from '../utils/formatting';
import NotificationPanel from './NotificationPanel';
import StatCard from './StatCard';
import DollarSignIcon from './icons/DollarSignIcon';
import AlertCircleIcon from './icons/AlertCircleIcon';
import CheckCircle2Icon from './icons/CheckCircle2Icon';
import SendIcon from './icons/SendIcon';

const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
        case PaymentStatus.Paid: return 'bg-green-100 text-green-800';
        case PaymentStatus.Due: return 'bg-blue-100 text-blue-800';
        case PaymentStatus.Partial: return 'bg-yellow-100 text-yellow-800';
        case PaymentStatus.Overdue: return 'bg-red-100 text-red-800';
        default: return 'bg-slate-100 text-slate-800';
    }
};

const PaymentTrackerPage: React.FC = () => {
    const [clients] = useClientData();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filterStatus, setFilterStatus] = useState<PaymentStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Client; direction: 'ascending' | 'descending' } | null>({ key: 'lastContactDate', direction: 'descending' });

    const addNotification = useCallback((message: string, type: 'info' | 'warning' | 'error') => {
        const newNotification: Notification = { id: Date.now().toString(), message, type };
        setNotifications(prev => [newNotification, ...prev]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
    }, []);

    const metrics = useMemo(() => {
        const totalRevenue = clients.reduce((acc, client) => acc + (client.totalPayment || 0), 0);
        const totalOutstanding = clients.filter(c => c.paymentStatus === PaymentStatus.Due || c.paymentStatus === PaymentStatus.Overdue).reduce((acc, client) => acc + client.paymentDue, 0);
        const totalOverdue = clients.filter(c => c.paymentStatus === PaymentStatus.Overdue).reduce((acc, client) => acc + client.paymentDue, 0);

        const paidCount = clients.filter(c => c.paymentStatus === PaymentStatus.Paid).length;
        const relevantTotal = clients.filter(c => c.paymentStatus === PaymentStatus.Paid || c.paymentStatus === PaymentStatus.Overdue).length;
        const onTimePaymentRate = relevantTotal > 0 ? (paidCount / relevantTotal) * 100 : 100;

        return { totalRevenue, totalOutstanding, totalOverdue, onTimePaymentRate };
    }, [clients]);
    
    const filteredClients = useMemo(() => {
        return clients
            .filter(client => {
                if (filterStatus === 'All') return client.paymentStatus !== PaymentStatus.NewLead;
                return client.paymentStatus === filterStatus;
            })
            .filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [clients, filterStatus, searchTerm]);

    const sortedClients = useMemo(() => {
        let sortableItems = [...filteredClients];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA === undefined || valA === null) return 1;
                if (valB === undefined || valB === null) return -1;
                
                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredClients, sortConfig]);

    const requestSort = (key: keyof Client) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    const handleSendReminder = (clientName: string) => {
        addNotification(`Reminder sent to ${clientName}.`, 'info');
    };

    const SortableHeader: React.FC<{ sortKey: keyof Client, children: React.ReactNode, className?: string }> = ({ sortKey, children, className }) => (
        <th scope="col" className={`px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider cursor-pointer ${className}`} onClick={() => requestSort(sortKey)}>
            {children} {sortConfig?.key === sortKey ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : ''}
        </th>
    );

    const filterOptions: (PaymentStatus | 'All')[] = ['All', PaymentStatus.Paid, PaymentStatus.Due, PaymentStatus.Overdue, PaymentStatus.Partial];

    return (
        <MainLayout>
            <NotificationPanel notifications={notifications} onDismiss={(id) => setNotifications(notifications.filter(n => n.id !== id))} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                        Payment Tracker
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg text-slate-600">
                        Monitor your cash flow with a clear overview of all client payments. Track revenue, outstanding dues, and send reminders with ease.
                    </p>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<DollarSignIcon className="h-6 w-6 text-green-600" />} title="Total Revenue" value={formatCurrency(metrics.totalRevenue)} iconBgColor="bg-green-100" />
                    <StatCard icon={<AlertCircleIcon className="h-6 w-6 text-blue-600" />} title="Total Outstanding" value={formatCurrency(metrics.totalOutstanding)} iconBgColor="bg-blue-100" />
                    <StatCard icon={<AlertCircleIcon className="h-6 w-6 text-red-600" />} title="Total Overdue" value={formatCurrency(metrics.totalOverdue)} iconBgColor="bg-red-100" />
                    <StatCard icon={<CheckCircle2Icon className="h-6 w-6 text-indigo-600" />} title="On-Time Payment Rate" value={`${metrics.onTimePaymentRate.toFixed(1)}%`} iconBgColor="bg-indigo-100" />
                </div>

                {/* Table and Controls */}
                <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                    <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center">
                        <div className="w-full md:w-1/2 lg:w-1/3">
                            <input
                                type="text"
                                placeholder="Search by client name..."
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-auto flex-grow flex items-center justify-center md:justify-end space-x-2">
                             {filterOptions.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-colors ${filterStatus === status ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <SortableHeader sortKey="name">Client</SortableHeader>
                                    <SortableHeader sortKey="lastContactDate" className="text-center">Due Date</SortableHeader>
                                    <SortableHeader sortKey="paymentDue" className="text-right">Amount</SortableHeader>
                                    <SortableHeader sortKey="paymentStatus" className="text-center">Status</SortableHeader>
                                    <th scope="col" className="relative px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y-slate-200">
                                {sortedClients.length > 0 ? (
                                    sortedClients.map(client => (
                                        <tr key={client.id} className="hover:bg-slate-50 transition-colors duration-200">
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <div className="font-semibold text-slate-900">{client.name}</div>
                                                <div className="text-sm text-slate-500">{client.email}</div>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 text-center">
                                                {new Date(client.lastContactDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 text-right font-medium">
                                                {formatCurrency(client.paymentDue)}
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-center">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(client.paymentStatus)}`}>
                                                    {client.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-center">
                                                {(client.paymentStatus === PaymentStatus.Due || client.paymentStatus === PaymentStatus.Overdue) && (
                                                    <button 
                                                        onClick={() => handleSendReminder(client.name)}
                                                        className="flex items-center justify-center mx-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-semibold py-1 px-3 rounded-lg transition text-sm"
                                                    >
                                                        <SendIcon className="h-4 w-4 mr-1.5" />
                                                        Send Reminder
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-slate-500">
                                            No payments match the current filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default PaymentTrackerPage;
