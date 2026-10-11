import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { MatchCard } from '../components/matches/MatchCard';
import { Star, Search, Trash2, Plus, Trophy } from 'lucide-react';

export const FavoritesScreen: React.FC = () => {
  const {
    matches,
    userProfile,
    toggleFavoriteTeam,
    toggleFavoriteLeague,
    favoriteLeagueIds,
    leagues,
  } = useSports();

  const [teamSearch, setTeamSearch] = useState<string>('');

  // Extract all unique teams from matches
  const allTeamsMap = new Map();
  matches.forEach((m) => {
    allTeamsMap.set(m.homeTeam.id, m.homeTeam);
    allTeamsMap.set(m.awayTeam.id, m.awayTeam);
  });
  const allTeams = Array.from(allTeamsMap.values());

  const favoriteTeams = allTeams.filter((t) =>
    userProfile.favoriteTeamIds.includes(t.id)
  );

  const searchedTeams = teamSearch
    ? allTeams.filter((t) =>
        t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
        t.shortName.toLowerCase().includes(teamSearch.toLowerCase())
      )
    : [];

  // Matches for starred teams
  const favoriteMatches = matches.filter(
    (m) =>
      userProfile.favoriteTeamIds.includes(m.homeTeam.id) ||
      userProfile.favoriteTeamIds.includes(m.awayTeam.id)
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Star className="w-4 h-4 fill-amber-400" />
          <span>My Club & League HQ</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white">
          Favourites & Custom Alerts
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Follow your favourite franchises and receive prioritized live match updates.
        </p>
      </div>

      {/* Add New Teams Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090e1f] border border-slate-800">
        <label className="text-xs font-bold text-slate-300 block mb-2">
          Add Teams to Favourites
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search team name (e.g. Madrid, Arsenal, Mumbai, Lakers)..."
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {teamSearch && (
          <div className="mt-3 divide-y divide-slate-800 max-h-48 overflow-y-auto">
            {searchedTeams.length > 0 ? (
              searchedTeams.map((team) => {
                const isSaved = userProfile.favoriteTeamIds.includes(team.id);
                return (
                  <div
                    key={team.id}
                    className="flex items-center justify-between py-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base" aria-hidden="true">{team.logo}</span>
                      <span className="font-medium text-slate-200">{team.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase">
                        {team.sport}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavoriteTeam(team.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                        isSaved
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-amber-500 text-slate-950'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="py-3 text-xs text-slate-500 text-center">
                No matching teams found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Starred Teams Grid */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Starred Teams ({favoriteTeams.length})
        </h2>

        {favoriteTeams.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {favoriteTeams.map((team) => (
              <div
                key={team.id}
                className="p-3.5 rounded-xl bg-[#090e1f] border border-amber-500/20 hover:border-amber-500/40 flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-2xl" aria-hidden="true">{team.logo}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">
                      {team.name}
                    </div>
                    <div className="text-[10px] text-slate-400 capitalize">
                      {team.sport} · {team.country}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleFavoriteTeam(team.id)}
                  title="Remove from favorites"
                  className="text-slate-600 hover:text-rose-400 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-[#090e1f] border border-slate-800 text-center text-xs text-slate-400">
            No teams saved yet. Use the search box above to follow your favorite franchises!
          </div>
        )}
      </section>

      {/* Starred Leagues */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Starred Tournaments & Leagues ({favoriteLeagueIds.length})
        </h2>

        <div className="flex flex-wrap gap-2">
          {leagues.map((league) => {
            const isFav = favoriteLeagueIds.includes(league.id);
            return (
              <button
                key={league.id}
                onClick={() => toggleFavoriteLeague(league.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isFav
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                    : 'bg-[#090e1f] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{league.icon}</span>
                <span>{league.name}</span>
                <Star className={`w-3.5 h-3.5 ml-1 ${isFav ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>
      </section>

      {/* Fixtures for Starred Teams */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Upcoming & Live Matches For My Teams ({favoriteMatches.length})
          </h2>
        </div>

        {favoriteMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#090e1f] border border-slate-800 text-center text-xs text-slate-400">
            None of your starred teams have matches in the current feed. Star more teams to populate this feed.
          </div>
        )}
      </section>
    </div>
  );
};
