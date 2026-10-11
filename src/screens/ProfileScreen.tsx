import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import {
  Flame,
  Trophy,
  Award,
  Settings,
  Edit2,
  Check,
  Shield,
  Star,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    predictions,
    setCurrentScreen,
  } = useSports();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>(userProfile.username);
  const [newHandle, setNewHandle] = useState<string>(userProfile.handle);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    updateUserProfile({
      username: newUsername.trim(),
      handle: newHandle.trim(),
    });
    setIsEditing(false);
  };

  const wonCount = predictions.filter((p) => p.status === 'WON').length;
  const lostCount = predictions.filter((p) => p.status === 'LOST').length;
  const pendingCount = predictions.filter((p) => p.status === 'PENDING').length;
  const totalSettled = wonCount + lostCount;
  const winRate = totalSettled > 0 ? Math.round((wonCount / totalSettled) * 100) : 78;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-14">
      {/* Profile Header */}
      <div className="relative rounded-3xl bg-[#090e1f] border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar with Prestige Badge */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-700 flex items-center justify-center text-3xl shadow-xl shadow-amber-500/20 text-slate-950 font-black font-display">
              👑
            </div>
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-slate-900 border border-amber-400 text-[10px] font-bold text-amber-300">
              {userProfile.tier}
            </span>
          </div>

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="bg-slate-900 border border-amber-400/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
                  placeholder="Enter username"
                />
                <input
                  type="text"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-400 focus:outline-none block"
                  placeholder="Enter handle"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-md text-xs flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded-md text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-white">
                    {userProfile.username}
                  </h1>
                  <span className="text-xs text-slate-400 font-mono-nums">
                    {userProfile.handle} · Member since 2026
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Edit Profile"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                <span>Global Rank #{userProfile.rankPosition}</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{userProfile.favoriteTeamIds.length} Starred Teams</span>
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('settings')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            Fan XP Points
          </span>
          <span className="font-display font-black text-xl text-amber-400 font-mono-nums mt-1 block">
            {userProfile.fanPoints.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-500">Non-monetary</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            Win Accuracy
          </span>
          <span className="font-display font-black text-xl text-emerald-400 font-mono-nums mt-1 block">
            {winRate}%
          </span>
          <span className="text-[10px] text-slate-500">{wonCount} won / {totalSettled} settled</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            Active Streak
          </span>
          <span className="font-display font-black text-xl text-amber-300 font-mono-nums mt-1 block">
            {userProfile.winStreak} 🔥
          </span>
          <span className="text-[10px] text-slate-500">Best: {userProfile.highestStreak} in a row</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            Active Slips
          </span>
          <span className="font-display font-black text-xl text-cyan-400 font-mono-nums mt-1 block">
            {pendingCount}
          </span>
          <span className="text-[10px] text-slate-500">In Play</span>
        </div>
      </div>

      {/* Trophy Showcase */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Badges & Accomplishments</span>
          </h3>
          <span className="text-xs text-amber-400 font-medium">3 Unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Sharpshooter</h4>
              <p className="text-[10px] text-slate-400">75%+ Win accuracy achieved</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-xl">
              🔥
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Streak Master</h4>
              <p className="text-[10px] text-slate-400">5+ Consecutive winning picks</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Tactical Pioneer</h4>
              <p className="text-[10px] text-slate-400">Predicted 25+ matches</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setCurrentScreen('favorites')}
          className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 hover:border-slate-700 text-left transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="text-xs font-bold text-white">Manage Favorite Teams</h4>
            <p className="text-[11px] text-slate-400">Add or edit tracked franchises</p>
          </div>
          <Star className="w-4 h-4 text-amber-400" />
        </button>

        <button
          onClick={() => setCurrentScreen('settings')}
          className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 hover:border-slate-700 text-left transition-colors flex items-center justify-between"
        >
          <div>
            <h4 className="text-xs font-bold text-white">App Preferences & Display</h4>
            <p className="text-[11px] text-slate-400">Odds format, notifications, haptics</p>
          </div>
          <Settings className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
