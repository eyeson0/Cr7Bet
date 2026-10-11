import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import {
  Bell,
  X,
  CheckCheck,
  Flame,
  Clock,
  ChevronRight,
} from 'lucide-react';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    openMatchDetails,
  } = useSports();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifs = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  const handleNotificationClick = (matchId?: string, notifId?: string) => {
    if (notifId) markNotificationRead(notifId);
    if (matchId) {
      setIsNotificationsOpen(false);
      openMatchDetails(matchId);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Notifications Center"
      className="fixed inset-0 z-50 flex items-start justify-end p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm"
    >
      <div className="bg-[#0b1021] border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[640px] mt-12 sm:mt-8 mr-0 sm:mr-4">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="font-display font-bold text-sm text-white">
              Notifications & Alerts
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {notifications.some((n) => !n.read) && (
              <button
                onClick={markAllNotificationsRead}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark All Read</span>
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-3 bg-slate-900/60 border-b border-slate-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filter === 'unread'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredNotifs.length > 0 ? (
            filteredNotifs.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item.matchId, item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  item.read
                    ? 'bg-slate-900/50 border-slate-800/80 text-slate-400'
                    : 'bg-[#0e162d] border-amber-500/30 text-slate-200 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                      {item.type === 'goal' ? '⚽' : item.type === 'prediction_settled' ? <Flame className="w-3.5 h-3.5 fill-amber-400" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4
                        className={`text-xs font-semibold ${
                          item.read ? 'text-slate-300' : 'text-white'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {item.message}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono-nums block mt-1">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>

                  {item.matchId && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-1" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-xs text-slate-400">
              No alerts in this view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
