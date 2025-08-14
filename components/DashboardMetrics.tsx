import React, { useMemo } from 'react';
import type { Client } from '../types';
import { Sentiment } from '../types';
import { formatCurrency } from '../utils/formatting';
import StatCard from './StatCard';
import UsersIcon from './icons/UsersIcon';
import DollarSignIcon from './icons/DollarSignIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';

interface DashboardMetricsProps {
    clients: Client[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ clients }) => {
    const metrics = useMemo(() => {
        const totalClients = clients.length;
        const totalRevenue = clients.reduce((acc, client) => acc + (client.totalPayment || 0), 0);
        const totalOutstanding = clients.reduce((acc, client) => acc + client.paymentDue, 0);
        
        const clientsWithSentiment = clients.filter(c => c.sentiment).length;
        const positiveSentiments = clients.filter(c => c.sentiment === Sentiment.Positive).length;
        const positiveSentimentPercentage = clientsWithSentiment > 0 ? (positiveSentiments / clientsWithSentiment) * 100 : 0;

        return {
            totalClients,
            totalRevenue,
            totalOutstanding,
            positiveSentimentPercentage,
        };
    }, [clients]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<UsersIcon className="h-6 w-6 text-indigo-600" />}
                    title="Total Clients"
                    value={metrics.totalClients.toString()}
                    iconBgColor="bg-indigo-100"
                />
                <StatCard
                    icon={<DollarSignIcon className="h-6 w-6 text-green-600" />}
                    title="Total Revenue"
                    value={formatCurrency(metrics.totalRevenue)}
                    iconBgColor="bg-green-100"
                />
                <StatCard
                    icon={<CreditCardIcon className="h-6 w-6 text-red-600" />}
                    title="Total Outstanding"
                    value={formatCurrency(metrics.totalOutstanding)}
                    iconBgColor="bg-red-100"
                />
                <StatCard
                    icon={<TrendingUpIcon className="h-6 w-6 text-blue-600" />}
                    title="Positive Sentiment"
                    value={`${metrics.positiveSentimentPercentage.toFixed(1)}%`}
                    iconBgColor="bg-blue-100"
                />
            </div>
        </div>
    );
};

export default DashboardMetrics;
