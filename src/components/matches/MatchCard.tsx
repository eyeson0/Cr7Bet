import React, { useState } from 'react';
import { Match } from '../../types/sports';
import { useSports } from '../../context/SportsContext';
import { formatOdds } from '../../services/storageService';
import {
  Star,
  ChevronRight,
  TrendingUp,
  Bell,
  Check,
} from 'lucide-react';

interface MatchCardProps {
  match: Match;
  featured?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, featured = false }) => {
  const {
    openMatchDetails,
    isFavoriteTeam,
    toggleFavoriteTeam,
    settings,
    placePrediction,
    userProfile,
    isMatchStartAlertActive,
    isScoreUpdateAlertActive,
    toggleMatchStartAlert,
    toggleScoreUpdateAlert,
  } = useSports();

  const [showAlertMenu, setShowAlertMenu] = useState<boolean>(false);

  const isHomeFavorite = isFavoriteTeam(match.homeTeam.id);
  const isAwayFavorite = isFavoriteTeam(match.awayTeam.id);
  const isAnyFavorite = isHomeFavorite || isAwayFavorite;

  const isStartAlertOn = isMatchStartAlertActive(match.id);
  const isScoreAlertOn = isScoreUpdateAlertActive(match.id);
  const hasAnyAlert = isStartAlertOn || isScoreAlertOn;

  const handleQuickPick = (
    e: React.MouseEvent,
    choice: 'HOME' | 'DRAW' | 'AWAY',
    label: string,
    odds: number
  ) => {
    e.stopPropagation();
    if (match.status === 'FINISHED') return;
    // Default 100 non-monetary fan points for quick pick
    const points = Math.min(100, userProfile.fanPoints);
    if (points <= 0) return;
    placePrediction(match, choice, label, points, odds);
  };

  return (
    <article
      onClick={() => openMatchDetails(match.id)}
      className={`group cursor-pointer rounded-2xl transition-all duration-200 border ${
        featured
          ? 'bg-gradient-to-b from-[#0e162b] to-[#090e1c] border-amber-500/40 shadow-xl shadow-amber-500/5 hover:border-amber-400'
          : 'bg-[#0b1021] border-slate-800/80 hover:border-slate-700 hover:bg-[#0e142a]'
      } p-4 sm:p-5 relative overflow-hidden`}
    >
      {/* Background radial accent for live match */}
      {match.status === 'LIVE' && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Top Metadata Header (Zero-Pill Compliance) */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3.5">
        <div className="flex items-center gap-2 truncate">
          <span className="font-medium text-slate-300">{match.leagueName}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="truncate">{match.venue}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {match.status === 'LIVE' ? (
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono-nums">
                {match.minute ? `${match.minute}'` : match.period || 'LIVE'}
              </span>
            </div>
          ) : match.status === 'UPCOMING' ? (
            <span className="text-slate-400 font-mono-nums">
              {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          ) : (
            <span className="text-slate-500 font-medium">Full Time</span>
          )}

          {/* Match Alert Bell Button with Quick Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAlertMenu(!showAlertMenu);
              }}
              aria-label={hasAnyAlert ? 'Manage match alerts (active)' : 'Set match alerts'}
              title={hasAnyAlert ? 'Match alerts active' : 'Turn on match alerts'}
              className={`p-1 rounded-md transition-colors relative ${
                hasAnyAlert
                  ? 'text-amber-400 bg-amber-500/15'
                  : 'text-slate-500 hover:text-amber-400'
              }`}
            >
              <Bell className={`w-4 h-4 ${hasAnyAlert ? 'fill-amber-400' : ''}`} />
              {hasAnyAlert && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 absolute top-0.5 right-0.5" />
              )}
            </button>

            {/* Alert Quick Popover */}
            {showAlertMenu && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-7 z-30 w-56 p-2 rounded-xl bg-[#0b1224] border border-amber-500/30 shadow-2xl space-y-1 text-left backdrop-blur-md"
              >
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                  Browser Match Alerts
                </div>

                <button
                  onClick={async () => {
                    await toggleMatchStartAlert(match);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors ${
                    isStartAlertOn
                      ? 'bg-amber-500/20 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Kickoff Start Alert</span>
                  {isStartAlertOn && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                <button
                  onClick={async () => {
                    await toggleScoreUpdateAlert(match);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors ${
                    isScoreAlertOn
                      ? 'bg-amber-500/20 text-amber-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>Score & Goal Updates</span>
                  {isScoreAlertOn && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Quick Favorite Star Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavoriteTeam(match.homeTeam.id);
            }}
            aria-label={isAnyFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="p-1 rounded-md text-slate-500 hover:text-amber-400 transition-colors ml-0.5"
          >
            <Star
              className={`w-4 h-4 ${
                isAnyFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-500'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Teams and Scores Row */}
      <div className="space-y-3 mb-4">
        {/* Home Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0" aria-hidden="true">{match.homeTeam.logo}</span>
            <span
              className={`font-semibold text-sm truncate ${
                isHomeFavorite ? 'text-amber-300' : 'text-slate-100'
              }`}
            >
              {match.homeTeam.name}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display font-extrabold text-lg text-white font-mono-nums">
              {match.status === 'UPCOMING' ? '-' : match.homeScore}
            </span>
            {match.homeSubScore && (
              <span className="text-[11px] text-slate-400 block font-mono-nums">
                {match.homeSubScore}
              </span>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl shrink-0" aria-hidden="true">{match.awayTeam.logo}</span>
            <span
              className={`font-semibold text-sm truncate ${
                isAwayFavorite ? 'text-amber-300' : 'text-slate-100'
              }`}
            >
              {match.awayTeam.name}
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display font-extrabold text-lg text-white font-mono-nums">
              {match.status === 'UPCOMING' ? '-' : match.awayScore}
            </span>
            {match.awaySubScore && (
              <span className="text-[11px] text-slate-400 block font-mono-nums">
                {match.awaySubScore}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Community Consensus Bar */}
      <div className="pt-2 pb-1 border-t border-slate-800/80 mb-3">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>Fan Consensus</span>
          </span>
          <span className="font-mono-nums text-slate-500">
            {match.predictionConsensus.totalVotes.toLocaleString()} fans voted
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${match.predictionConsensus.homeWin}%` }}
            className="bg-amber-400 transition-all duration-300"
            title={`Home: ${match.predictionConsensus.homeWin}%`}
          />
          {match.predictionConsensus.draw !== undefined && (
            <div
              style={{ width: `${match.predictionConsensus.draw}%` }}
              className="bg-slate-500 transition-all duration-300"
              title={`Draw: ${match.predictionConsensus.draw}%`}
            />
          )}
          <div
            style={{ width: `${match.predictionConsensus.awayWin}%` }}
            className="bg-sky-400 transition-all duration-300"
            title={`Away: ${match.predictionConsensus.awayWin}%`}
          />
        </div>
      </div>

      {/* Quick Prediction Buttons (Non-monetary Fan Picks) */}
      {match.status !== 'FINISHED' ? (
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <button
            onClick={(e) =>
              handleQuickPick(
                e,
                'HOME',
                `${match.homeTeam.shortName} Win`,
                match.oddsDisplay.home
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900/90 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-800 transition-colors text-left"
          >
            <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
              1 ({match.homeTeam.shortName})
            </span>
            <span className="text-xs font-bold text-amber-400 font-mono-nums">
              {formatOdds(match.oddsDisplay.home, settings.oddsFormat)}
            </span>
          </button>

          {match.oddsDisplay.draw !== undefined ? (
            <button
              onClick={(e) =>
                handleQuickPick(e, 'DRAW', 'Draw', match.oddsDisplay.draw!)
              }
              className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900/90 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-800 transition-colors text-left"
            >
              <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                X (Draw)
              </span>
              <span className="text-xs font-bold text-amber-400 font-mono-nums">
                {formatOdds(match.oddsDisplay.draw, settings.oddsFormat)}
              </span>
            </button>
          ) : (
            <div className="flex items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900/40 border border-slate-800/40 text-[10px] text-slate-600">
              No Draw
            </div>
          )}

          <button
            onClick={(e) =>
              handleQuickPick(
                e,
                'AWAY',
                `${match.awayTeam.shortName} Win`,
                match.oddsDisplay.away
              )
            }
            className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-900/90 hover:bg-amber-500/10 hover:border-amber-500/40 border border-slate-800 transition-colors text-left"
          >
            <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
              2 ({match.awayTeam.shortName})
            </span>
            <span className="text-xs font-bold text-amber-400 font-mono-nums">
              {formatOdds(match.oddsDisplay.away, settings.oddsFormat)}
            </span>
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between pt-1 text-xs text-slate-400">
          <span>Match Concluded</span>
          <span className="flex items-center gap-1 text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>View Full Stats</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </article>
  );
};
