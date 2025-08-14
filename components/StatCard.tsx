import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, iconBgColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center transition-transform transform hover:-translate-y-1">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

export default StatCard;
