import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { SportType } from '../types/sports';
import { MatchCard } from '../components/matches/MatchCard';
import { Star, Trophy, ChevronRight, Search } from 'lucide-react';

export const LeaguesScreen: React.FC = () => {
  const {
    leagues,
    matches,
    favoriteLeagueIds,
    toggleFavoriteLeague,
  } = useSports();

  const [selectedSport, setSelectedSport] = useState<SportType>('football');
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>('ucl');
  const [leagueSearch, setLeagueSearch] = useState<string>('');

  const sportsTabs: { id: SportType; label: string; icon: string }[] = [
    { id: 'football', label: 'Football', icon: '⚽' },
    { id: 'cricket', label: 'Cricket', icon: '🏏' },
    { id: 'basketball', label: 'Basketball', icon: '🏀' },
    { id: 'tennis', label: 'Tennis', icon: '🎾' },
  ];

  // Filter leagues by sport & search
  const visibleLeagues = leagues
    .filter((l) => l.sport === selectedSport)
    .filter((l) =>
      leagueSearch ? l.name.toLowerCase().includes(leagueSearch.toLowerCase()) : true
    );

  const currentLeague = leagues.find((l) => l.id === selectedLeagueId) || visibleLeagues[0];

  // Matches in the selected league
  const leagueMatches = matches.filter((m) => m.leagueId === currentLeague?.id);

  return (
    <div className="space-y-6 pb-12">
      {/* Screen Title */}
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">
          Sports & Leagues Directory
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore premier global tournaments, league standings, and fixture schedules.
        </p>
      </div>

      {/* Sport Selector Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {sportsTabs.map((sport) => {
          const isActive = selectedSport === sport.id;
          return (
            <button
              key={sport.id}
              onClick={() => {
                setSelectedSport(sport.id);
                const first = leagues.find((l) => l.sport === sport.id);
                if (first) setSelectedLeagueId(first.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{sport.icon}</span>
              <span>{sport.label}</span>
            </button>
          );
        })}
      </div>

      {/* League Selection and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leagues List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Competitions ({visibleLeagues.length})
            </h2>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search tournament..."
              value={leagueSearch}
              onChange={(e) => setLeagueSearch(e.target.value)}
              className="w-full bg-[#090e1f] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            {visibleLeagues.map((league) => {
              const isSelected = league.id === currentLeague?.id;
              const isFav = favoriteLeagueIds.includes(league.id);

              return (
                <div
                  key={league.id}
                  onClick={() => setSelectedLeagueId(league.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                      : 'bg-[#090e1f] border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-xl" aria-hidden="true">{league.icon}</span>
                    <div className="truncate">
                      <div className="font-semibold text-xs truncate text-white">
                        {league.name}
                      </div>
                      <div className="text-[10px] text-slate-400">{league.country}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteLeague(league.id);
                      }}
                      className="p-1 text-slate-500 hover:text-amber-400"
                      aria-label="Toggle favourite league"
                    >
                      <Star
                        className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`}
                      />
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: League Standings & Scheduled Matches */}
        <div className="lg:col-span-2 space-y-6">
          {currentLeague && (
            <>
              {/* League Header Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d1428] to-[#090f20] border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{currentLeague.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {currentLeague.name}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {currentLeague.country} · {selectedSport.toUpperCase()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavoriteLeague(currentLeague.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    favoriteLeagueIds.includes(currentLeague.id)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      favoriteLeagueIds.includes(currentLeague.id)
                        ? 'fill-amber-400 text-amber-400'
                        : ''
                    }`}
                  />
                  <span>
                    {favoriteLeagueIds.includes(currentLeague.id) ? 'Saved' : 'Save League'}
                  </span>
                </button>
              </div>

              {/* League Standings Table */}
              {currentLeague.standings && currentLeague.standings.length > 0 && (
                <div className="bg-[#090e1f] rounded-2xl border border-slate-800 p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <h4 className="font-display font-bold text-sm text-white">
                        Official Standings
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-500">Live points table</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                          <th className="py-2 px-2">#</th>
                          <th className="py-2 px-2">Team / Athlete</th>
                          <th className="py-2 px-2 text-center font-mono-nums">P</th>
                          <th className="py-2 px-2 text-center font-mono-nums">W</th>
                          <th className="py-2 px-2 text-center font-mono-nums">D</th>
                          <th className="py-2 px-2 text-center font-mono-nums">L</th>
                          <th className="py-2 px-2 text-center font-mono-nums">DIFF</th>
                          <th className="py-2 px-2 text-right font-mono-nums font-bold text-amber-400">
                            PTS
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono-nums">
                        {currentLeague.standings.map((row) => (
                          <tr
                            key={row.team}
                            className="hover:bg-slate-800/40 transition-colors"
                          >
                            <td className="py-2.5 px-2 font-bold text-slate-400">
                              {row.rank}
                            </td>
                            <td className="py-2.5 px-2 font-sans font-medium text-slate-200">
                              {row.team}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-400">
                              {row.played}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-300">
                              {row.won}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-400">
                              {row.drawn}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-400">
                              {row.lost}
                            </td>
                            <td className="py-2.5 px-2 text-center text-slate-300">
                              {row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}
                            </td>
                            <td className="py-2.5 px-2 text-right font-bold text-amber-400">
                              {row.points}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* League Fixtures */}
              <div>
                <h4 className="font-display font-bold text-sm text-white mb-3">
                  Fixtures in {currentLeague.name} ({leagueMatches.length})
                </h4>
                {leagueMatches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {leagueMatches.map((m) => (
                      <MatchCard key={m.id} match={m} />
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-[#090e1f] rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                    No scheduled fixtures in this tournament round currently.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
