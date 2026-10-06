import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Sparkles,
  Calendar,
  Briefcase,
  UserCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    notifications,
    currentUserRole,
    currentCandidate,
    markNotificationAsRead,
    markAllNotificationsRead,
    setActiveTab,
  } = useApp();

  if (!isOpen) return null;

  // Filter relevant notifications
  const filteredNotifs = notifications.filter((n) => {
    if (currentUserRole === 'admin') return true;
    if (currentUserRole === 'candidate') {
      return (
        n.targetRole === 'all' ||
        n.targetRole === 'candidate' && (!n.candidateId || n.candidateId === currentCandidate?.id)
      );
    }
    return n.targetRole === 'all';
  });

  const handleItemClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.link) {
      setActiveTab(notif.link);
      onClose();
    }
  };

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'selection':
        return <CheckCheck className="w-4 h-4 text-emerald-600" />;
      case 'resignation':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      case 'vacancy':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0f294a] text-white p-4.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm">Notifications & Alerts</h3>
              <p className="text-[10px] text-slate-300">
                {filteredNotifs.filter((n) => !n.read).length} Unread Updates
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-blue-200 hover:text-white underline font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto divide-y divide-slate-100 flex-1 p-2">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => handleItemClick(n)}
                className={`p-3 rounded-xl transition cursor-pointer flex items-start space-x-3 text-xs ${
                  n.read ? 'hover:bg-slate-50 opacity-75' : 'bg-blue-50/60 hover:bg-blue-50 font-medium'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 mt-0.5">
                  {getNotifIcon(n.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900">{n.title}</h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400 space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <p>No notifications available at this time.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 text-center shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
