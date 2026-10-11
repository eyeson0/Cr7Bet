import React from 'react';
import { useSports } from '../../context/SportsContext';
import { Wifi, Battery, Signal, Monitor } from 'lucide-react';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, updateSettings } = useSports();

  if (settings.deviceViewMode !== 'mobile_shell') {
    return <div className="min-h-screen bg-[#050811] text-slate-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#03050a] flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 select-none">
      {/* Top Switcher Banner */}
      <div className="mb-4 flex items-center justify-between w-full max-w-sm sm:max-w-md px-2 text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-semibold text-amber-400">
          📱 iPhone 16 Pro Mobile Shell
        </span>
        <button
          onClick={() => updateSettings({ deviceViewMode: 'responsive' })}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <Monitor className="w-3.5 h-3.5 text-amber-400" />
          <span>Exit to Full Web View</span>
        </button>
      </div>

      {/* Realistic Phone Bezel Frame */}
      <div className="w-full max-w-[420px] h-[880px] max-h-[95vh] bg-[#050811] rounded-[50px] border-[10px] border-slate-800 shadow-[0_0_60px_-10px_rgba(245,158,11,0.15)] flex flex-col overflow-hidden relative">
        {/* Dynamic Island / Notch */}
        <div className="h-10 bg-[#070b16] shrink-0 px-6 flex items-center justify-between z-50 text-[11px] text-slate-200 select-none">
          <span className="font-mono-nums font-bold">9:41</span>
          <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Scrollable Mobile Screen Canvas */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-[#060a14] shrink-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
