import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { INITIAL_LEADERBOARD } from '../services/sportsDataService';
import {
  Trophy,
  Flame,
  Award,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const LeaderboardScreen: React.FC = () => {
  const { userProfile } = useSports();
  const [periodTab, setPeriodTab] = useState<'season' | 'weekly'>('season');

  const leaderboard = INITIAL_LEADERBOARD;

  const getTierColor = (badge: string) => {
    switch (badge) {
      case 'Master':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Diamond':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Gold':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'Silver':
        return 'text-slate-300 bg-slate-500/10 border-slate-500/30';
      default:
        return 'text-amber-700 bg-amber-900/10 border-amber-900/30';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Tactical Prestige Arena</span>
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">
            Fan Prediction Leaderboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Rankings based solely on prediction accuracy and virtual Fan XP. Points have zero cash value.
          </p>
        </div>

        {/* Period filter */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setPeriodTab('season')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              periodTab === 'season'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Championship Season
          </button>
          <button
            onClick={() => setPeriodTab('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              periodTab === 'weekly'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly Blitz
          </button>
        </div>
      </div>

      {/* Non-Cash Disclaimer Strip */}
      <div className="p-3 bg-[#090e1f] border border-amber-500/20 rounded-xl flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Non-redeemable Fan XP Points · Strictly skill & recognition</span>
        </div>
        <span className="text-[11px] text-amber-400 font-semibold hidden sm:inline">
          Tier Multiplier Active (1.5x)
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rank 2 */}
        <div className="order-2 md:order-1 p-5 rounded-2xl bg-[#090e1f] border border-slate-800 text-center relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 font-display font-black text-sm flex items-center justify-center mx-auto mb-2">
              2
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-2 text-xl">
              🥈
            </div>
            <h3 className="font-display font-bold text-white text-base">
              {leaderboard[1].username}
            </h3>
            <span className="text-xs text-amber-400 font-semibold">
              {leaderboard[1].badge} Tier
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono-nums space-y-1">
            <div className="font-black text-white text-base">
              {leaderboard[1].fanPoints.toLocaleString()} XP
            </div>
            <div className="text-slate-400">
              {leaderboard[1].accuracy}% Accuracy · {leaderboard[1].streak} Streak
            </div>
          </div>
        </div>

        {/* Rank 1 (Master Champion) */}
        <div className="order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-[#141e3d] to-[#090e1f] border-2 border-amber-400 text-center relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-amber-500/10">
          <div className="absolute top-2 right-2">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-display font-black text-sm flex items-center justify-center mx-auto mb-2 shadow-lg">
              1
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto mb-2 text-3xl">
              👑
            </div>
            <h3 className="font-display font-extrabold text-white text-lg">
              {leaderboard[0].username}
            </h3>
            <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
              {leaderboard[0].badge} Champion
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-500/20 text-xs font-mono-nums space-y-1">
            <div className="font-black text-amber-400 text-xl">
              {leaderboard[0].fanPoints.toLocaleString()} XP
            </div>
            <div className="text-slate-300">
              {leaderboard[0].accuracy}% Accuracy · {leaderboard[0].streak} Streak 🔥
            </div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 md:order-3 p-5 rounded-2xl bg-[#090e1f] border border-slate-800 text-center relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-full bg-amber-900/60 text-amber-400 font-display font-black text-sm flex items-center justify-center mx-auto mb-2">
              3
            </div>
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-2 text-xl">
              🥉
            </div>
            <h3 className="font-display font-bold text-white text-base">
              {leaderboard[2].username}
            </h3>
            <span className="text-xs text-cyan-400 font-semibold">
              {leaderboard[2].badge} Tier
            </span>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-mono-nums space-y-1">
            <div className="font-black text-white text-base">
              {leaderboard[2].fanPoints.toLocaleString()} XP
            </div>
            <div className="text-slate-400">
              {leaderboard[2].accuracy}% Accuracy · {leaderboard[2].streak} Streak
            </div>
          </div>
        </div>
      </div>

      {/* User's Current Position Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-400/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-display font-black text-sm flex items-center justify-center font-mono-nums">
            #4
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm">
              {userProfile.username} (You)
            </h4>
            <span className="text-xs text-amber-300 font-semibold">
              {userProfile.tier} Tier · {userProfile.winStreak}-Win Streak
            </span>
          </div>
        </div>

        <div className="text-right font-mono-nums">
          <span className="font-black text-base text-amber-400 block">
            {userProfile.fanPoints.toLocaleString()} XP
          </span>
          <span className="text-[10px] text-slate-400">Top 1% Global</span>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-[#090e1f] rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-white">Full Rankings Table</h3>
          <span className="text-xs text-slate-500 font-mono-nums">Updated hourly</span>
        </div>

        <div className="divide-y divide-slate-800/60 font-mono-nums text-xs">
          {leaderboard.map((user) => {
            const isMe = user.isCurrentUser;
            return (
              <div
                key={user.id}
                className={`p-3.5 sm:px-5 flex items-center justify-between transition-colors ${
                  isMe ? 'bg-amber-500/10 font-bold' : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-6 text-slate-400 font-black text-sm shrink-0">
                    #{user.rank}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-sans font-semibold truncate ${
                          isMe ? 'text-amber-300' : 'text-slate-100'
                        }`}
                      >
                        {user.username}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border uppercase font-bold shrink-0 ${getTierColor(
                          user.badge
                        )}`}
                      >
                        {user.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {user.accuracy}% Win Rate · {user.totalPredictions} picks
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-black text-sm text-white">
                    {user.fanPoints.toLocaleString()}{' '}
                    <span className="text-amber-400 text-xs">XP</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {user.streak > 0 ? `${user.streak} streak 🔥` : 'Active'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
