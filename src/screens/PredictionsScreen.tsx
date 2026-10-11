import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { formatOdds } from '../services/storageService';
import { Match } from '../types/sports';
import {
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';

export const PredictionsScreen: React.FC = () => {
  const {
    matches,
    predictions,
    placePrediction,
    userProfile,
    settings,
  } = useSports();

  const [activeTab, setActiveTab] = useState<'open' | 'history'>('open');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<{
    choice: 'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5';
    label: string;
    odds: number;
  } | null>(null);
  const [stake, setStake] = useState<number>(200);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const openMatches = matches.filter((m) => m.status !== 'FINISHED');

  const handlePlaceBet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch || !selectedMarket) return;

    const ok = placePrediction(
      selectedMatch,
      selectedMarket.choice,
      selectedMarket.label,
      stake,
      selectedMarket.odds
    );

    if (ok) {
      setSubmitSuccess(
        `Successfully locked in ${stake} Fan Points on ${selectedMarket.label}!`
      );
      setSelectedMarket(null);
      setTimeout(() => setSubmitSuccess(null), 4000);
    }
  };

  return (
    <div className="space-y-6 pb-14">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Non-Monetary Fan Arena</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">
            Match Predictions & Fan XP
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Demonstrate your tactical knowledge. Points carry zero monetary value and cannot be cashed out.
          </p>
        </div>

        {/* User Balance Card */}
        <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-[#090e1f] border border-amber-500/30">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Prestige XP
            </span>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-display font-black text-xl text-white font-mono-nums">
                {userProfile.fanPoints.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800" />

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Win Streak
            </span>
            <span className="font-display font-bold text-sm text-amber-400 font-mono-nums">
              {userProfile.winStreak} Wins 🔥
            </span>
          </div>
        </div>
      </div>

      {/* Zero Cash Value Legal Callout */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <strong className="text-amber-300">Non-Gambling Guarantee:</strong> CR7BET is an
          educational and entertainment sports analytics platform. Predictions are made
          strictly with non-cash Fan XP. No real money deposits, withdrawals, or gambling
          services exist on this application.
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('open')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'open'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900/80 text-slate-400 hover:text-white'
          }`}
        >
          Open Fixtures ({openMatches.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'history'
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900/80 text-slate-400 hover:text-white'
          }`}
        >
          My Prediction Slip History ({predictions.length})
        </button>
      </div>

      {/* Notification banner */}
      {submitSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{submitSuccess}</span>
        </div>
      )}

      {/* Tab Content: OPEN PREDICTIONS */}
      {activeTab === 'open' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns: Match selection */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Fixtures Open For Fan Picks
            </h2>

            {openMatches.map((match) => (
              <div
                key={match.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  selectedMatch?.id === match.id
                    ? 'bg-[#0e162d] border-amber-500/60 shadow-lg shadow-amber-500/10'
                    : 'bg-[#090e1f] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Match header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-300">{match.leagueName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-nums">
                      {match.status === 'LIVE'
                        ? `${match.minute || match.period} LIVE`
                        : new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <span className="text-amber-400 font-mono-nums font-semibold">
                    {match.predictionConsensus.totalVotes.toLocaleString()} votes
                  </span>
                </div>

                {/* Score / Teams */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span>{match.homeTeam.logo}</span>
                    <span>{match.homeTeam.name}</span>
                  </div>
                  <div className="font-mono-nums font-extrabold text-amber-400 text-sm">
                    {match.status === 'UPCOMING' ? 'VS' : `${match.homeScore} - ${match.awayScore}`}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span>{match.awayTeam.name}</span>
                    <span>{match.awayTeam.logo}</span>
                  </div>
                </div>

                {/* Prediction market buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => {
                      setSelectedMatch(match);
                      setSelectedMarket({
                        choice: 'HOME',
                        label: `${match.homeTeam.shortName} to Win`,
                        odds: match.oddsDisplay.home,
                      });
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedMatch?.id === match.id && selectedMarket?.choice === 'HOME'
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="text-[11px] truncate">{match.homeTeam.shortName} Win</div>
                    <div className="font-mono-nums font-bold text-xs mt-0.5">
                      {formatOdds(match.oddsDisplay.home, settings.oddsFormat)}x
                    </div>
                  </button>

                  {match.oddsDisplay.draw !== undefined ? (
                    <button
                      onClick={() => {
                        setSelectedMatch(match);
                        setSelectedMarket({
                          choice: 'DRAW',
                          label: 'Draw Outcome',
                          odds: match.oddsDisplay.draw!,
                        });
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedMatch?.id === match.id && selectedMarket?.choice === 'DRAW'
                          ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                          : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="text-[11px]">Draw</div>
                      <div className="font-mono-nums font-bold text-xs mt-0.5">
                        {formatOdds(match.oddsDisplay.draw, settings.oddsFormat)}x
                      </div>
                    </button>
                  ) : (
                    <div className="flex items-center justify-center p-2 text-slate-600 text-xs">
                      -
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelectedMatch(match);
                      setSelectedMarket({
                        choice: 'AWAY',
                        label: `${match.awayTeam.shortName} to Win`,
                        odds: match.oddsDisplay.away,
                      });
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      selectedMatch?.id === match.id && selectedMarket?.choice === 'AWAY'
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-900/90 text-slate-200 border-slate-800 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="text-[11px] truncate">{match.awayTeam.shortName} Win</div>
                    <div className="font-mono-nums font-bold text-xs mt-0.5">
                      {formatOdds(match.oddsDisplay.away, settings.oddsFormat)}x
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Prediction Slip Widget */}
          <div className="space-y-4">
            <div className="bg-[#090e1f] border border-slate-800 rounded-2xl p-5 sticky top-20">
              <h3 className="font-display font-bold text-base text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Fan Prediction Slip</span>
              </h3>

              {selectedMatch && selectedMarket ? (
                <form onSubmit={handlePlaceBet} className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <div className="text-[11px] text-slate-400">
                      {selectedMatch.homeTeam.shortName} vs {selectedMatch.awayTeam.shortName}
                    </div>
                    <div className="text-xs font-bold text-amber-300">
                      {selectedMarket.label}
                    </div>
                    <div className="text-xs text-slate-400 font-mono-nums">
                      Multiplier: <strong>{selectedMarket.odds.toFixed(2)}x</strong>
                    </div>
                  </div>

                  {/* Stake controls */}
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Points Stake (Non-cash):</span>
                      <span className="font-mono-nums font-bold text-amber-400">{stake} XP</span>
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[100, 250, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setStake(amt)}
                          className={`py-1 rounded-lg text-xs font-mono-nums ${
                            stake === amt
                              ? 'bg-amber-400 text-slate-950 font-bold'
                              : 'bg-slate-900 text-slate-300 border border-slate-800'
                          }`}
                        >
                          +{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated prestige return */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex justify-between items-center text-xs">
                    <span className="text-slate-300">Potential Return:</span>
                    <span className="font-mono-nums font-black text-amber-400 text-sm">
                      {Math.round(stake * selectedMarket.odds).toLocaleString()} XP
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={userProfile.fanPoints < stake}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-transform active:scale-95 shadow-md shadow-amber-500/10 disabled:opacity-50"
                  >
                    Lock Non-Monetary Pick
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 text-xs text-slate-400">
                  Select any fixture and market from the left column to configure your prediction pick.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: PREDICTION HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Past Predictions & Results ({predictions.length})
          </h2>

          <div className="space-y-3">
            {predictions.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{p.matchTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-nums">
                      {new Date(p.placedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-amber-400">
                    Pick: {p.predictedChoiceLabel} ({p.oddsRatio.toFixed(2)}x)
                  </div>
                  <div className="text-xs text-slate-400 font-mono-nums">
                    Stake: {p.pointsStaked} XP · Potential: {p.potentialReturn} XP
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {p.status === 'WON' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5 font-mono-nums">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>WON (+{p.potentialReturn} XP)</span>
                    </span>
                  ) : p.status === 'LOST' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/40 font-mono-nums">
                      LOST (-{p.pointsStaked} XP)
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/40 flex items-center gap-1.5 font-mono-nums">
                      <Clock className="w-3.5 h-3.5" />
                      <span>IN PLAY / PENDING</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
