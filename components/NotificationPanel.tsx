
import React from 'react';
import type { Notification } from '../types';
import XIcon from './icons/XIcon';

interface NotificationPanelProps {
    notifications: Notification[];
    onDismiss: (id: string) => void;
}

const NotificationCard: React.FC<{ notification: Notification; onDismiss: (id: string) => void }> = ({ notification, onDismiss }) => {
    const baseClasses = "flex items-center justify-between w-full max-w-sm p-4 text-white rounded-lg shadow-lg";
    const colorClasses = {
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`${baseClasses} ${colorClasses[notification.type]}`}>
            <div className="text-sm font-medium">{notification.message}</div>
            <button onClick={() => onDismiss(notification.id)} className="ml-4 -mr-1 p-1.5 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition">
                <XIcon className="h-5 w-5" />
            </button>
        </div>
    );
};


const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onDismiss }) => {
    return (
        <div className="fixed top-5 right-5 z-50 space-y-3">
            {notifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} onDismiss={onDismiss} />
            ))}
        </div>
    );
};

export default NotificationPanel;
