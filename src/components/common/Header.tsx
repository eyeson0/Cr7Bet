import React from 'react';
import { useSports, ScreenTab } from '../../context/SportsContext';
import {
  Bell,
  Search,
  Smartphone,
  Monitor,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentScreen,
    setCurrentScreen,
    setIsSearchOpen,
    setIsNotificationsOpen,
    unreadNotificationsCount,
    userProfile,
    settings,
    updateSettings,
  } = useSports();

  const navItems: { label: string; screen: ScreenTab }[] = [
    { label: 'Home', screen: 'home' },
    { label: 'Leagues', screen: 'leagues' },
    { label: 'Predictions', screen: 'predictions' },
    { label: 'Leaderboard', screen: 'leaderboard' },
    { label: 'About', screen: 'about' },
  ];

  const toggleDeviceMode = () => {
    updateSettings({
      deviceViewMode: settings.deviceViewMode === 'mobile_shell' ? 'responsive' : 'mobile_shell',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text & logo element, no extra tags) */}
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
          aria-label="CR7BET Home"
        >
          {/* Original Geometric Monogram Crest */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-200">
            <span className="font-display font-black text-slate-950 text-sm tracking-wider">CR7</span>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white whitespace-nowrap">
            CR7<span className="text-amber-400">BET</span>
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line nav links (hidden on mobile, shown md+) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'hover:text-white text-slate-300'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-3.5 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action / Quick Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Device Shell Viewport Switcher */}
          <button
            onClick={toggleDeviceMode}
            title={
              settings.deviceViewMode === 'mobile_shell'
                ? 'Switch to Responsive Web'
                : 'Switch to Mobile App Preview'
            }
            aria-label="Toggle device preview mode"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-300 hover:text-white hover:border-amber-400/50 transition-colors"
          >
            {settings.deviceViewMode === 'mobile_shell' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">Web View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span className="whitespace-nowrap">Mobile Shell</span>
              </>
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search matches, leagues and teams"
            className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Notifications"
            className="w-9 h-9 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* Non-monetary Points Pill / Profile trigger */}
          <button
            onClick={() => setCurrentScreen('profile')}
            aria-label="View Profile"
            className="flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 transition-all text-xs text-amber-300"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-mono-nums font-bold tracking-tight">
              {userProfile.fanPoints.toLocaleString()}
            </span>
            <span className="text-[10px] uppercase font-semibold text-amber-400/80 hidden lg:inline">
              XP
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
