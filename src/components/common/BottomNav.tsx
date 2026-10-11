import React from 'react';
import { useSports, ScreenTab } from '../../context/SportsContext';
import {
  Flame,
  Trophy,
  Star,
  User,
  LayoutGrid,
  Radio,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useSports();

  const tabs: { label: string; screen: ScreenTab; icon: React.ElementType }[] = [
    { label: 'Home', screen: 'home', icon: Radio },
    { label: 'Leagues', screen: 'leagues', icon: LayoutGrid },
    { label: 'Predict', screen: 'predictions', icon: Flame },
    { label: 'Ranks', screen: 'leaderboard', icon: Trophy },
    { label: 'Saved', screen: 'favorites', icon: Star },
    { label: 'Profile', screen: 'profile', icon: User },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060a14]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-1 shadow-2xl"
    >
      <div className="grid grid-cols-6 items-center h-14 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.screen;
          const Icon = tab.icon;
          return (
            <button
              key={tab.screen}
              onClick={() => setCurrentScreen(tab.screen)}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center transition-colors relative ${
                isActive ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.6]'
                }`}
              />
              <span
                className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                  isActive ? 'font-bold text-amber-400' : 'font-medium text-slate-400'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-amber-400 absolute top-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
