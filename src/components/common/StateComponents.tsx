import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-44 bg-slate-800/40 rounded-2xl border border-slate-800/60" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-48 bg-slate-800/30 rounded-2xl border border-slate-800/50" />
        <div className="h-48 bg-slate-800/30 rounded-2xl border border-slate-800/50" />
        <div className="h-48 bg-slate-800/30 rounded-2xl border border-slate-800/50" />
        <div className="h-48 bg-slate-800/30 rounded-2xl border border-slate-800/50" />
      </div>
    </div>
  );
};

export const EmptyState: React.FC<{
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}> = ({ title, description, actionText, onAction }) => {
  return (
    <div className="py-12 px-6 text-center bg-[#080d1c] border border-slate-800/80 rounded-2xl max-w-lg mx-auto">
      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-amber-400">
        ⚽
      </div>
      <h3 className="text-base font-semibold text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-slate-400 mb-5 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState: React.FC<{
  message: string;
  onRetry: () => void;
}> = ({ message, onRetry }) => {
  return (
    <div className="py-10 px-6 text-center bg-rose-950/20 border border-rose-900/40 rounded-2xl max-w-md mx-auto">
      <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto mb-3" />
      <h3 className="text-base font-semibold text-rose-200 mb-1">Data Feed Error</h3>
      <p className="text-xs text-rose-300/80 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Retry Connection</span>
      </button>
    </div>
  );
};
