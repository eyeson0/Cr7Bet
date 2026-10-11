import React from 'react';
import { useSports } from '../../context/SportsContext';
import { Radio } from 'lucide-react';

export const LiveTicker: React.FC = () => {
  const { matches, openMatchDetails } = useSports();
  const liveMatches = matches.filter((m) => m.status === 'LIVE');

  if (liveMatches.length === 0) {
    return null;
  }

  return (
    <section aria-label="Live Matches Ticker" className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Live Scores Center ({liveMatches.length} Active)</span>
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Real-time ticker feed
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
        {liveMatches.map((match) => (
          <button
            key={match.id}
            onClick={() => openMatchDetails(match.id)}
            className="flex-shrink-0 w-72 bg-[#090e1e] hover:bg-[#0c142b] border border-amber-500/20 hover:border-amber-400/60 rounded-xl p-3 text-left transition-all group"
          >
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
              <span className="font-semibold text-slate-300 truncate max-w-[150px]">
                {match.leagueName}
              </span>
              <span className="text-amber-400 font-mono-nums font-bold">
                {match.minute ? `${match.minute}'` : match.period}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200 truncate flex items-center gap-1.5">
                  <span aria-hidden="true">{match.homeTeam.logo}</span>
                  {match.homeTeam.shortName}
                </span>
                <span className="font-display font-extrabold text-sm text-white font-mono-nums">
                  {match.homeScore}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-200 truncate flex items-center gap-1.5">
                  <span aria-hidden="true">{match.awayTeam.logo}</span>
                  {match.awayTeam.shortName}
                </span>
                <span className="font-display font-extrabold text-sm text-white font-mono-nums">
                  {match.awayScore}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
