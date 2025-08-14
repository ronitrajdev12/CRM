import React from 'react';
import type { ActionItem } from '../types';
import AlertTriangleIcon from './icons/AlertTriangleIcon';
import MailIcon from './icons/MailIcon';
import MessageCircleIcon from './icons/MessageCircleIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface ActionItemsProps {
    items: ActionItem[];
    onActionClick: (clientId: string) => void;
}

const iconMap: { [key in ActionItem['type']]: React.ReactNode } = {
    overdue: <AlertTriangleIcon className="h-5 w-5 text-red-600" />,
    'follow-up': <MailIcon className="h-5 w-5 text-blue-600" />,
    feedback: <MessageCircleIcon className="h-5 w-5 text-yellow-600" />,
};

const iconBgMap: { [key in ActionItem['type']]: string } = {
    overdue: 'bg-red-100',
    'follow-up': 'bg-blue-100',
    feedback: 'bg-yellow-100',
};

const ActionItems: React.FC<ActionItemsProps> = ({ items, onActionClick }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Action Items</h3>
            {items.length > 0 ? (
                <ul className="space-y-3">
                    {items.map(item => (
                        <li key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200 group">
                            <div className="flex items-center overflow-hidden">
                                <div className={`flex-shrink-0 p-2 rounded-full ${iconBgMap[item.type]}`}>
                                    {iconMap[item.type]}
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="font-semibold text-slate-800 truncate">{item.clientName}</p>
                                    <p className="text-sm text-slate-500 truncate">{item.message}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onActionClick(item.clientId)} 
                                className="ml-2 text-slate-400 group-hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-100/50 transition-colors"
                                title={`View ${item.clientName}`}
                                aria-label={`View details for ${item.clientName}`}
                            >
                               <ArrowRightIcon className="h-5 w-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-6">
                    <p className="text-slate-500">No urgent actions right now.</p>
                    <p className="text-sm text-slate-400">Great job staying on top of things!</p>
                </div>
            )}
        </div>
    );
};

export default ActionItems;