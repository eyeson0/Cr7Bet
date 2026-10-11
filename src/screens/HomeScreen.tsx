import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { MatchCard } from '../components/matches/MatchCard';
import { LiveTicker } from '../components/matches/LiveTicker';
import { LoadingSkeleton, EmptyState, ErrorState } from '../components/common/StateComponents';
import { SportType } from '../types/sports';
import {
  Flame,
  Star,
  Zap,
  TrendingUp,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    matches,
    activeSport,
    setActiveSport,
    activeStatusFilter,
    setActiveStatusFilter,
    isLoading,
    error,
    refreshData,
    openMatchDetails,
    isFavoriteTeam,
    userProfile,
    setCurrentScreen,
  } = useSports();

  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  const sportsList: { id: SportType | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Sports', icon: '⚡' },
    { id: 'football', label: 'Football', icon: '⚽' },
    { id: 'cricket', label: 'Cricket', icon: '🏏' },
    { id: 'basketball', label: 'Basketball', icon: '🏀' },
    { id: 'tennis', label: 'Tennis', icon: '🎾' },
  ];

  const statusTabs: { id: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'; label: string }[] = [
    { id: 'ALL', label: 'All Matches' },
    { id: 'LIVE', label: 'Live Now' },
    { id: 'UPCOMING', label: 'Upcoming' },
    { id: 'FINISHED', label: 'Results' },
  ];

  // Filtering matches
  const filteredMatches = matches.filter((m) => {
    if (activeSport !== 'all' && m.sport !== activeSport) return false;
    if (activeStatusFilter !== 'ALL' && m.status !== activeStatusFilter) return false;
    if (onlyFavorites) {
      const matchHasFavorite = isFavoriteTeam(m.homeTeam.id) || isFavoriteTeam(m.awayTeam.id);
      if (!matchHasFavorite) return false;
    }
    return true;
  });

  const featuredMatch = matches.find((m) => m.id === 'fb-01') || matches[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Live Scores Ticker */}
      <LiveTicker />

      {/* Featured Blockbuster Match Showcase */}
      {featuredMatch && !onlyFavorites && activeSport === 'all' && activeStatusFilter === 'ALL' && (
        <section
          aria-label="Blockbuster Featured Match"
          onClick={() => openMatchDetails(featuredMatch.id)}
          className="relative rounded-3xl overflow-hidden border border-amber-500/40 bg-[#090e1e] cursor-pointer group shadow-2xl transition-all duration-300 hover:border-amber-400"
        >
          {/* Hero background image with measured contrast scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src="/src/assets/images/cr7bet_hero_stadium_1791687794887.jpg"
              alt="Futuristic stadium arena"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060a16] via-[#060a16]/80 to-transparent" />
          </div>

          <div className="relative z-10 p-5 sm:p-7">
            {/* Header Kicker */}
            <div className="flex items-center justify-between text-xs text-amber-400 mb-4 font-semibold">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-amber-400" />
                <span className="uppercase tracking-wider">Featured Blockbuster Fixture</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-normal">
                <span>{featuredMatch.leagueName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-nums text-amber-400 font-bold">
                  {featuredMatch.minute ? `${featuredMatch.minute}' LIVE` : 'Upcoming'}
                </span>
              </div>
            </div>

            {/* Scoreboard Split */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-2 mb-4">
              {/* Home Team */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <span className="text-3xl sm:text-4xl" aria-hidden="true">
                  {featuredMatch.homeTeam.logo}
                </span>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {featuredMatch.homeTeam.name}
                  </h4>
                  <span className="text-xs text-slate-400">Home · {featuredMatch.homeTeam.country}</span>
                </div>
              </div>

              {/* Central Score or Time */}
              <div className="text-center py-2 sm:py-0">
                <div className="inline-block px-4 py-2 rounded-2xl bg-slate-900/90 border border-slate-700/80">
                  <div className="font-display font-black text-2xl sm:text-3xl text-white tracking-wider font-mono-nums">
                    {featuredMatch.status === 'UPCOMING'
                      ? 'VS'
                      : `${featuredMatch.homeScore} - ${featuredMatch.awayScore}`}
                  </div>
                  <span className="text-[11px] text-amber-400 font-medium block mt-0.5">
                    {featuredMatch.status === 'LIVE' ? 'Match In Progress' : 'Scheduled'}
                  </span>
                </div>
              </div>

              {/* Away Team */}
              <div className="flex sm:flex-col items-center sm:text-center justify-end sm:justify-center gap-3">
                <span className="text-3xl sm:text-4xl sm:order-1" aria-hidden="true">
                  {featuredMatch.awayTeam.logo}
                </span>
                <div className="text-right sm:text-center sm:order-2">
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    {featuredMatch.awayTeam.name}
                  </h4>
                  <span className="text-xs text-slate-400">Away · {featuredMatch.awayTeam.country}</span>
                </div>
              </div>
            </div>

            {/* Footer Strip with Quick Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-slate-400">{featuredMatch.venue}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-amber-400 font-mono-nums font-semibold">
                  {featuredMatch.predictionConsensus.homeWin}% Fan Win Consensus
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openMatchDetails(featuredMatch.id);
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl transition-transform active:scale-95 shadow-md shadow-amber-500/10 ml-auto"
              >
                Match Analytics & Predictions
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Sports Segmented Selector */}
      <section aria-label="Sports Categories" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white">Select Sport & Category</h2>
          <span className="text-xs text-slate-400">
            {filteredMatches.length} Fixtures Available
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sportsList.map((sport) => {
            const isActive = activeSport === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => setActiveSport(sport.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/70 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span aria-hidden="true">{sport.icon}</span>
                <span>{sport.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Tabs & Favourites Toggle */}
      <section className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Match Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {statusTabs.map((tab) => {
            const isActive = activeStatusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Favourites Only Toggle */}
        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
            onlyFavorites
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>Starred Teams Only</span>
        </button>
      </section>

      {/* Main Fixtures Grid */}
      <section aria-label="Match Fixtures">
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={refreshData} />
        ) : filteredMatches.length === 0 ? (
          <EmptyState
            title="No Matches Found"
            description="No fixtures matched your selected filters. Try switching sports or clearing the starred-teams filter."
            actionText="Reset Filters"
            onAction={() => {
              setActiveSport('all');
              setActiveStatusFilter('ALL');
              setOnlyFavorites(false);
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      {/* Non-Monetary Prediction Quest Callout */}
      <section className="rounded-2xl border border-amber-500/20 bg-gradient-to-r from-[#0d1326] via-[#090e1c] to-[#080d19] p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Flame className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Daily Fan Prediction Challenge
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Lock in your picks across football, cricket & basketball to protect your{' '}
              <strong className="text-amber-300">{userProfile.winStreak}-win streak</strong>. No money, pure glory.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentScreen('predictions')}
          className="w-full sm:w-auto px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shrink-0 whitespace-nowrap shadow-md shadow-amber-500/10"
        >
          Open Prediction Arena
        </button>
      </section>
    </div>
  );
};
