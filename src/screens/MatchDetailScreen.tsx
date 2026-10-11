import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { formatOdds } from '../services/storageService';
import {
  ArrowLeft,
  Star,
  Activity,
  Users,
  Clock,
  Flame,
  Award,
  Bell,
  Zap,
  Check,
  AlertCircle,
} from 'lucide-react';

export const MatchDetailScreen: React.FC = () => {
  const {
    selectedMatchId,
    closeMatchDetails,
    matches,
    isFavoriteTeam,
    toggleFavoriteTeam,
    settings,
    placePrediction,
    userProfile,
    isMatchStartAlertActive,
    isScoreUpdateAlertActive,
    toggleMatchStartAlert,
    toggleScoreUpdateAlert,
    browserNotificationPermission,
    requestNotificationPermission,
    sendTestBrowserNotification,
  } = useSports();

  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'timeline' | 'lineups' | 'h2h'>('overview');
  const [stakeAmount, setStakeAmount] = useState<number>(250);
  const [selectedPick, setSelectedPick] = useState<'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5' | null>(null);
  const [predictionMessage, setPredictionMessage] = useState<string | null>(null);

  const match = matches.find((m) => m.id === selectedMatchId);

  if (!match) return null;

  const isHomeFav = isFavoriteTeam(match.homeTeam.id);
  const isAwayFav = isFavoriteTeam(match.awayTeam.id);

  const handlePlacePick = (
    choice: 'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5',
    label: string,
    odds: number
  ) => {
    setSelectedPick(choice);
    const success = placePrediction(match, choice, label, stakeAmount, odds);
    if (success) {
      setPredictionMessage(`Success! Locked in ${stakeAmount} Fan XP on ${label} (${odds.toFixed(2)}x)`);
      setTimeout(() => setPredictionMessage(null), 4000);
    } else {
      setPredictionMessage('Insufficient Fan Points! Lower stake amount or earn points.');
      setTimeout(() => setPredictionMessage(null), 3000);
    }
  };

  return (
    <div
      role="region"
      aria-label="Match Details"
      className="max-w-4xl mx-auto space-y-6 pb-16"
    >
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={closeMatchDetails}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavoriteTeam(match.homeTeam.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isHomeFav || isAwayFav
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Star team in favourites"
          >
            <Star className={`w-4 h-4 ${isHomeFav || isAwayFav ? 'fill-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hero Match Center Scoreboard */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-[#090e1f] p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">{match.leagueName}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{match.venue}</span>
          </div>

          <div className="flex items-center gap-2 font-mono-nums font-bold">
            {match.status === 'LIVE' ? (
              <span className="text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>{match.minute ? `${match.minute}'` : match.period || 'LIVE'}</span>
              </span>
            ) : match.status === 'UPCOMING' ? (
              <span className="text-slate-400">
                {new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : (
              <span className="text-slate-500">Full Time Final</span>
            )}
          </div>
        </div>

        {/* Central Teams & Score */}
        <div className="grid grid-cols-3 items-center gap-4 py-2">
          {/* Home */}
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl mb-2" aria-hidden="true">
              {match.homeTeam.logo}
            </span>
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              {match.homeTeam.name}
            </h2>
            <span className="text-xs text-slate-400">{match.homeTeam.country}</span>
          </div>

          {/* Scores */}
          <div className="text-center">
            <div className="font-display font-black text-3xl sm:text-5xl text-white tracking-widest font-mono-nums mb-1">
              {match.status === 'UPCOMING'
                ? 'VS'
                : `${match.homeScore} : ${match.awayScore}`}
            </div>
            {match.homeSubScore && match.awaySubScore && (
              <div className="text-[11px] text-slate-400 font-mono-nums">
                {match.homeSubScore} · {match.awaySubScore}
              </div>
            )}
            <span className="inline-block mt-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[11px] text-amber-400 font-medium">
              {match.period || (match.status === 'LIVE' ? 'In Play' : 'Pre-Match')}
            </span>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center text-center">
            <span className="text-4xl sm:text-5xl mb-2" aria-hidden="true">
              {match.awayTeam.logo}
            </span>
            <h2 className="font-display font-bold text-base sm:text-lg text-white">
              {match.awayTeam.name}
            </h2>
            <span className="text-xs text-slate-400">{match.awayTeam.country}</span>
          </div>
        </div>

        {/* Referee & Match Info footer */}
        {match.referee && (
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-400">
            Official Referee: <strong className="text-slate-300">{match.referee}</strong>
          </div>
        )}
      </section>

      {/* Match Alert Notification Strip (Browser Notification API) */}
      <section className="p-4 sm:p-5 rounded-2xl bg-[#0b1226] border border-amber-500/30 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Match-Specific Browser Alerts</span>
                {browserNotificationPermission === 'granted' && (
                  <span className="text-[10px] text-emerald-400 font-normal lowercase bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    os-push active
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-slate-400">
                Receive instant local browser notifications for kickoff start time and score changes.
              </p>
            </div>
          </div>

          {browserNotificationPermission !== 'granted' && (
            <button
              onClick={requestNotificationPermission}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors self-start sm:self-auto shrink-0"
            >
              Enable Browser Alerts
            </button>
          )}
        </div>

        {/* Toggle options row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* Kickoff alert toggle */}
          <button
            onClick={() => toggleMatchStartAlert(match)}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              isMatchStartAlertActive(match.id)
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Match Start Alert</div>
                <div className="text-[10px] text-slate-400">
                  {match.status === 'LIVE' ? 'Match currently underway' : 'Alert on kickoff whistle'}
                </div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                isMatchStartAlertActive(match.id)
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'border-slate-700 bg-slate-800'
              }`}
            >
              {isMatchStartAlertActive(match.id) && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>

          {/* Score & Goal updates toggle */}
          <button
            onClick={() => toggleScoreUpdateAlert(match)}
            className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              isScoreUpdateAlertActive(match.id)
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5 text-left">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Score Updates Alert</div>
                <div className="text-[10px] text-slate-400">
                  Real-time notification on every goal & point
                </div>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                isScoreUpdateAlertActive(match.id)
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                  : 'border-slate-700 bg-slate-800'
              }`}
            >
              {isScoreUpdateAlertActive(match.id) && <Check className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>

        {/* Footer info & test notification trigger */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-500 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {browserNotificationPermission === 'granted'
                ? 'Native browser Notification API active. Alerts will sound and show on screen.'
                : browserNotificationPermission === 'denied'
                ? 'Browser notifications blocked in site permissions. Local on-screen banners are used.'
                : 'Click "Enable Browser Alerts" to grant Notification permission.'}
            </span>
          </div>

          <button
            onClick={sendTestBrowserNotification}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 ml-auto"
          >
            Test Browser Alert
          </button>
        </div>
      </section>

      {/* Match Center Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview', icon: Activity },
          { id: 'stats', label: 'Statistics', icon: Flame },
          { id: 'timeline', label: 'Timeline & Events', icon: Clock },
          { id: 'lineups', label: 'Squad & Lineups', icon: Users },
          { id: 'h2h', label: 'Head-to-Head', icon: Award },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Fan Consensus Bar */}
          <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Community Match Winner Consensus</span>
            </h3>

            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex mb-3">
              <div
                style={{ width: `${match.predictionConsensus.homeWin}%` }}
                className="bg-amber-400 transition-all duration-300"
              />
              {match.predictionConsensus.draw !== undefined && (
                <div
                  style={{ width: `${match.predictionConsensus.draw}%` }}
                  className="bg-slate-500 transition-all duration-300"
                />
              )}
              <div
                style={{ width: `${match.predictionConsensus.awayWin}%` }}
                className="bg-sky-400 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-3 text-center text-xs">
              <div>
                <span className="text-slate-400 block">{match.homeTeam.shortName}</span>
                <span className="font-bold text-amber-400 font-mono-nums">
                  {match.predictionConsensus.homeWin}%
                </span>
              </div>
              {match.predictionConsensus.draw !== undefined && (
                <div>
                  <span className="text-slate-400 block">Draw</span>
                  <span className="font-bold text-slate-300 font-mono-nums">
                    {match.predictionConsensus.draw}%
                  </span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block">{match.awayTeam.shortName}</span>
                <span className="font-bold text-sky-400 font-mono-nums">
                  {match.predictionConsensus.awayWin}%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Interactive Prediction Card (Non-monetary) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c142c] to-[#080d1c] border border-amber-500/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Lock Your Non-Monetary Prediction
                </h3>
                <p className="text-xs text-slate-400">
                  Virtual Fan Points only (Zero cash value). Earn Prestige & Leaderboard Rank.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Your Fan Points</span>
                <span className="font-mono-nums font-bold text-amber-400 text-sm">
                  {userProfile.fanPoints.toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Stake selector slider/buttons */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-slate-400 shrink-0">Fan XP Stake:</span>
              {[100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setStakeAmount(amt)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono-nums font-semibold transition-colors ${
                    stakeAmount === amt
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>

            {predictionMessage && (
              <div className="p-3 mb-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-semibold text-amber-300">
                {predictionMessage}
              </div>
            )}

            {/* Prediction Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() =>
                  handlePlacePick(
                    'HOME',
                    `${match.homeTeam.name} Win`,
                    match.oddsDisplay.home
                  )
                }
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedPick === 'HOME'
                    ? 'bg-amber-500/20 border-amber-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-slate-300 truncate">
                  {match.homeTeam.name}
                </div>
                <div className="font-mono-nums font-bold text-amber-400 text-sm mt-1">
                  {formatOdds(match.oddsDisplay.home, settings.oddsFormat)}x
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Returns: {Math.round(stakeAmount * match.oddsDisplay.home)} XP
                </div>
              </button>

              {match.oddsDisplay.draw !== undefined && (
                <button
                  onClick={() =>
                    handlePlacePick('DRAW', 'Draw', match.oddsDisplay.draw!)
                  }
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPick === 'DRAW'
                      ? 'bg-amber-500/20 border-amber-400'
                      : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-medium text-slate-300">Draw</div>
                  <div className="font-mono-nums font-bold text-amber-400 text-sm mt-1">
                    {formatOdds(match.oddsDisplay.draw, settings.oddsFormat)}x
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Returns: {Math.round(stakeAmount * match.oddsDisplay.draw)} XP
                  </div>
                </button>
              )}

              <button
                onClick={() =>
                  handlePlacePick(
                    'AWAY',
                    `${match.awayTeam.name} Win`,
                    match.oddsDisplay.away
                  )
                }
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedPick === 'AWAY'
                    ? 'bg-amber-500/20 border-amber-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-medium text-slate-300 truncate">
                  {match.awayTeam.name}
                </div>
                <div className="font-mono-nums font-bold text-amber-400 text-sm mt-1">
                  {formatOdds(match.oddsDisplay.away, settings.oddsFormat)}x
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Returns: {Math.round(stakeAmount * match.oddsDisplay.away)} XP
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: STATS */}
      {activeTab === 'stats' && (
        <div className="p-6 bg-[#090e1f] rounded-2xl border border-slate-800 space-y-5">
          <h3 className="font-display font-bold text-base text-white">
            Comprehensive Match Analytics
          </h3>

          {match.stats ? (
            <div className="space-y-4">
              {/* Possession */}
              {match.stats.possession && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono-nums">
                    <span>{match.stats.possession[0]}%</span>
                    <span className="font-sans font-medium text-slate-400">Possession</span>
                    <span>{match.stats.possession[1]}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${match.stats.possession[0]}%` }}
                      className="bg-amber-400"
                    />
                    <div
                      style={{ width: `${match.stats.possession[1]}%` }}
                      className="bg-sky-400"
                    />
                  </div>
                </div>
              )}

              {/* Shots Total */}
              {match.stats.shotsTotal && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono-nums">
                    <span>{match.stats.shotsTotal[0]}</span>
                    <span className="font-sans font-medium text-slate-400">Total Shots</span>
                    <span>{match.stats.shotsTotal[1]}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{
                        width: `${(match.stats.shotsTotal[0] / (match.stats.shotsTotal[0] + match.stats.shotsTotal[1])) * 100}%`,
                      }}
                      className="bg-amber-400"
                    />
                    <div
                      style={{
                        width: `${(match.stats.shotsTotal[1] / (match.stats.shotsTotal[0] + match.stats.shotsTotal[1])) * 100}%`,
                      }}
                      className="bg-sky-400"
                    />
                  </div>
                </div>
              )}

              {/* Shots on Target */}
              {match.stats.shotsOnTarget && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono-nums">
                    <span>{match.stats.shotsOnTarget[0]}</span>
                    <span className="font-sans font-medium text-slate-400">Shots on Target</span>
                    <span>{match.stats.shotsOnTarget[1]}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{
                        width: `${(match.stats.shotsOnTarget[0] / (match.stats.shotsOnTarget[0] + match.stats.shotsOnTarget[1] || 1)) * 100}%`,
                      }}
                      className="bg-amber-400"
                    />
                    <div
                      style={{
                        width: `${(match.stats.shotsOnTarget[1] / (match.stats.shotsOnTarget[0] + match.stats.shotsOnTarget[1] || 1)) * 100}%`,
                      }}
                      className="bg-sky-400"
                    />
                  </div>
                </div>
              )}

              {/* Expected Goals xG */}
              {match.stats.expectedGoals && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-300 font-mono-nums">
                    <span className="font-bold text-amber-400">{match.stats.expectedGoals[0]}</span>
                    <span className="font-sans font-medium text-slate-400">Expected Goals (xG)</span>
                    <span className="font-bold text-sky-400">{match.stats.expectedGoals[1]}</span>
                  </div>
                </div>
              )}

              {/* Corners & Fouls */}
              {match.stats.corners && (
                <div className="flex justify-between py-2 border-t border-slate-800/80 text-xs">
                  <span className="font-mono-nums font-bold text-slate-200">{match.stats.corners[0]}</span>
                  <span className="text-slate-400">Corner Kicks</span>
                  <span className="font-mono-nums font-bold text-slate-200">{match.stats.corners[1]}</span>
                </div>
              )}

              {match.stats.fouls && (
                <div className="flex justify-between py-2 border-t border-slate-800/80 text-xs">
                  <span className="font-mono-nums font-bold text-slate-200">{match.stats.fouls[0]}</span>
                  <span className="text-slate-400">Fouls Committed</span>
                  <span className="font-mono-nums font-bold text-slate-200">{match.stats.fouls[1]}</span>
                </div>
              )}

              {/* Cricket stats */}
              {match.stats.runRate && (
                <div className="flex justify-between py-2 border-t border-slate-800/80 text-xs">
                  <span className="font-mono-nums font-bold text-amber-400">{match.stats.runRate[0]} rpo</span>
                  <span className="text-slate-400">Current Run Rate</span>
                  <span className="font-mono-nums font-bold text-sky-400">{match.stats.runRate[1]} rpo</span>
                </div>
              )}

              {/* Tennis stats */}
              {match.stats.aces && (
                <div className="flex justify-between py-2 border-t border-slate-800/80 text-xs">
                  <span className="font-mono-nums font-bold text-amber-400">{match.stats.aces[0]}</span>
                  <span className="text-slate-400">Aces Served</span>
                  <span className="font-mono-nums font-bold text-sky-400">{match.stats.aces[1]}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              Detailed in-game statistics will be available once the match commences.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="p-6 bg-[#090e1f] rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-display font-bold text-base text-white">
            Key Match Events & Timeline
          </h3>

          {match.events && match.events.length > 0 ? (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {match.events.map((ev) => (
                <div key={ev.id} className="relative flex items-start gap-3">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono-nums font-bold text-amber-400">
                        {ev.minute}'
                      </span>
                      <span className="font-semibold text-slate-200">
                        {ev.player}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {ev.type.replace('_', ' ')}
                      </span>
                    </div>
                    {ev.detail && (
                      <div className="text-xs text-slate-400 mt-0.5">{ev.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              No timeline incidents recorded yet for this fixture.
            </div>
          )}
        </div>
      )}

      {/* Tab 4: LINEUPS */}
      {activeTab === 'lineups' && (
        <div className="space-y-6">
          {match.lineups ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Starting 11 */}
              <div className="p-5 bg-[#090e1f] rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    {match.homeTeam.name}
                  </h4>
                  <span className="text-xs text-amber-400 font-mono-nums font-bold">
                    {match.lineups.formationHome || '4-3-3'}
                  </span>
                </div>
                <div className="space-y-2">
                  {match.lineups.homeStarting.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-800/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 font-mono-nums font-bold text-slate-400">
                          {player.number}
                        </span>
                        <span className="text-slate-200 font-medium">{player.name}</span>
                        {player.isCaptain && (
                          <span className="text-[10px] text-amber-400 font-bold border border-amber-500/30 px-1 rounded">
                            C
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 font-mono-nums text-[11px]">
                        {player.position}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Starting 11 */}
              <div className="p-5 bg-[#090e1f] rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <h4 className="font-display font-bold text-sm text-white">
                    {match.awayTeam.name}
                  </h4>
                  <span className="text-xs text-amber-400 font-mono-nums font-bold">
                    {match.lineups.formationAway || '4-2-3-1'}
                  </span>
                </div>
                <div className="space-y-2">
                  {match.lineups.awayStarting.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-800/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 font-mono-nums font-bold text-slate-400">
                          {player.number}
                        </span>
                        <span className="text-slate-200 font-medium">{player.name}</span>
                        {player.isCaptain && (
                          <span className="text-[10px] text-amber-400 font-bold border border-amber-500/30 px-1 rounded">
                            C
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500 font-mono-nums text-[11px]">
                        {player.position}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-[#090e1f] rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
              Lineups and tactical rosters are announced approximately 60 minutes before kickoff.
            </div>
          )}
        </div>
      )}

      {/* Tab 5: H2H */}
      {activeTab === 'h2h' && (
        <div className="p-6 bg-[#090e1f] rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-display font-bold text-base text-white">
            Historical Head-to-Head Encounters
          </h3>

          {match.h2h && match.h2h.length > 0 ? (
            <div className="space-y-2.5">
              {match.h2h.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="font-medium text-slate-300">{item.competition}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono-nums">
                    <span className="font-semibold text-slate-200">{item.homeTeam}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-amber-400">
                      {item.homeScore} - {item.awayScore}
                    </span>
                    <span className="font-semibold text-slate-200">{item.awayTeam}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400">
              First recorded competitive meeting in this tournament series.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
