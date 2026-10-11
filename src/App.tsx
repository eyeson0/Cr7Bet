import React from 'react';
import { SportsProvider, useSports } from './context/SportsContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { DemoFeedBanner } from './components/common/DemoFeedBanner';
import { MobileShell } from './components/layout/MobileShell';
import { HomeScreen } from './screens/HomeScreen';
import { LeaguesScreen } from './screens/LeaguesScreen';
import { MatchDetailScreen } from './screens/MatchDetailScreen';
import { PredictionsScreen } from './screens/PredictionsScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { AboutLegalScreen } from './screens/AboutLegalScreen';
import { RunGuideScreen } from './screens/RunGuideScreen';
import { OnboardingModal } from './screens/OnboardingModal';
import { SearchModal } from './screens/SearchModal';
import { NotificationsModal } from './screens/NotificationsModal';
import { ToastContainer } from './components/common/ToastContainer';
import { Shield } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentScreen, selectedMatchId, setCurrentScreen } = useSports();

  return (
    <div className="flex-1 flex flex-col">
      <DemoFeedBanner />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 pt-5 pb-20 md:pb-10">
        {selectedMatchId ? (
          <MatchDetailScreen />
        ) : (
          <>
            {currentScreen === 'home' && <HomeScreen />}
            {currentScreen === 'leagues' && <LeaguesScreen />}
            {currentScreen === 'predictions' && <PredictionsScreen />}
            {currentScreen === 'favorites' && <FavoritesScreen />}
            {currentScreen === 'leaderboard' && <LeaderboardScreen />}
            {currentScreen === 'profile' && <ProfileScreen />}
            {currentScreen === 'settings' && <SettingsScreen />}
            {currentScreen === 'about' && <AboutLegalScreen />}
            {currentScreen === 'guide' && <RunGuideScreen />}
          </>
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-[#060a14] py-8 px-4 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-display text-[10px]">
              CR7
            </div>
            <span className="font-semibold text-slate-300">
              CR7BET Sports Intelligence & Prediction Arena
            </span>
            <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">
              Non-gambling sports information platform
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setCurrentScreen('about')}
              className="hover:text-amber-400 transition-colors"
            >
              Non-Gambling Policy
            </button>
            <button
              onClick={() => setCurrentScreen('about')}
              className="hover:text-amber-400 transition-colors"
            >
              Support
            </button>
            <button
              onClick={() => setCurrentScreen('guide')}
              className="hover:text-amber-400 transition-colors"
            >
              Developer Guide
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Overlays */}
      <OnboardingModal />
      <SearchModal />
      <NotificationsModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <SportsProvider>
      <MobileShell>
        <MainContent />
      </MobileShell>
    </SportsProvider>
  );
}
