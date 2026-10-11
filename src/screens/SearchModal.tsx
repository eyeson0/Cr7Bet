import React from 'react';
import { useSports } from '../context/SportsContext';
import { Search, X, ChevronRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    openMatchDetails,
    setCurrentScreen,
  } = useSports();

  if (!isSearchOpen) return null;

  const handleSelectMatch = (id: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    openMatchDetails(id);
  };

  const handleSelectLeague = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setCurrentScreen('leagues');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Sports"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="bg-[#0b1021] border border-amber-500/30 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search teams, players, tournaments, sports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-slate-500 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!searchQuery.trim() ? (
            <div className="text-center py-8 text-xs text-slate-500">
              Type to search live fixtures, clubs, and international leagues.
              <div className="flex justify-center gap-2 mt-3">
                {['Madrid', 'Arsenal', 'IPL', 'NBA', 'Alcaraz'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-300 text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.matches.length === 0 && searchResults.leagues.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No results found for &ldquo;{searchQuery}&rdquo;. Try another term.
            </div>
          ) : (
            <>
              {/* Matching Matches */}
              {searchResults.matches.length > 0 && (
                <div>
                  <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Fixtures ({searchResults.matches.length})
                  </h3>
                  <div className="space-y-1.5">
                    {searchResults.matches.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleSelectMatch(m.id)}
                        className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-[#0e162d] border border-slate-800 hover:border-amber-500/40 text-left transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="text-base" aria-hidden="true">{m.homeTeam.logo}</span>
                          <span className="text-xs font-semibold text-slate-200">
                            {m.homeTeam.name} vs {m.awayTeam.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono-nums shrink-0">
                          <span className="text-amber-400 font-bold">
                            {m.status === 'UPCOMING' ? 'Upcoming' : `${m.homeScore}-${m.awayScore}`}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Leagues */}
              {searchResults.leagues.length > 0 && (
                <div>
                  <h3 className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Tournaments ({searchResults.leagues.length})
                  </h3>
                  <div className="space-y-1.5">
                    {searchResults.leagues.map((l) => (
                      <button
                        key={l.id}
                        onClick={handleSelectLeague}
                        className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-[#0e162d] border border-slate-800 text-left transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-base" aria-hidden="true">{l.icon}</span>
                          <span className="text-xs font-semibold text-slate-200">
                            {l.name} ({l.country})
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
