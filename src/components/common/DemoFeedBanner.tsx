import React from 'react';
import { useSports } from '../../context/SportsContext';
import { RefreshCw, Play, Pause, FileCode, Shield } from 'lucide-react';

export const DemoFeedBanner: React.FC = () => {
  const {
    isLiveSimulating,
    toggleLiveSimulation,
    refreshData,
    isLoading,
    setCurrentScreen,
  } = useSports();

  return (
    <div className="bg-[#090e1f] border-b border-slate-800/80 px-4 lg:px-8 py-2">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Clear demonstration & non-gambling notice */}
        <div className="flex items-center gap-2.5 text-slate-400">
          <Shield className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-slate-200">Demonstration Feed Active</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">
              Pure sports predictions & live scores (Zero cash value, no gambling)
            </span>
          </div>
        </div>

        {/* Right: Controls & Run Guide */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Live Clock Simulator Button */}
          <button
            onClick={toggleLiveSimulation}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
              isLiveSimulating
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Toggle live match clock advancement"
          >
            {isLiveSimulating ? (
              <>
                <Pause className="w-3 h-3 text-emerald-400" />
                <span>Sim Running</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span>Sim Paused</span>
              </>
            )}
          </button>

          {/* Refresh Button */}
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] font-medium transition-colors disabled:opacity-50"
            title="Advance live events and refresh feeds"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Tick Feed</span>
          </button>

          {/* Setup / Expo / React Native Guide */}
          <button
            onClick={() => setCurrentScreen('guide')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-medium transition-colors"
          >
            <FileCode className="w-3 h-3 text-amber-400" />
            <span>Architecture & Run Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
