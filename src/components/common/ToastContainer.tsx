import React from 'react';
import { useSports } from '../../context/SportsContext';
import { Bell, Flame, X, ChevronRight } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast, openMatchDetails } = useSports();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Match Notifications"
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-2 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#0b1226]/95 border border-amber-500/40 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
        >
          {/* Icon */}
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            {toast.type === 'goal' ? (
              <span className="text-base" aria-hidden="true">⚽</span>
            ) : toast.type === 'match_start' ? (
              <Bell className="w-4 h-4 text-amber-400" />
            ) : (
              <Flame className="w-4 h-4 fill-amber-400" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white tracking-tight">
              {toast.title}
            </h4>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
              {toast.message}
            </p>

            {toast.matchId && (
              <button
                onClick={() => {
                  dismissToast(toast.id);
                  openMatchDetails(toast.matchId!);
                }}
                className="mt-2 text-[10px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>Open Match Center</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Close */}
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-500 hover:text-slate-200 p-1 shrink-0"
            aria-label="Dismiss Notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
