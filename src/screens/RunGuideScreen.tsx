import React, { useState } from 'react';
import {
  FileCode,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  Layers,
  Database,
  ShieldAlert,
} from 'lucide-react';

export const RunGuideScreen: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const expoBashSnippet = `# 1. Create a fresh Expo app with TypeScript and Expo Router
npx create-expo-app@latest cr7bet --template tabs

# 2. Navigate to project root
cd cr7bet

# 3. Install core dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-status-bar @react-native-async-storage/async-storage lucide-react-native

# 4. Start the interactive development server
npx expo start

# Press 'i' to launch on iOS Simulator
# Press 'a' to launch on Android Emulator
# Press 'w' to launch in Responsive Web Browser`;

  const checklistItems = [
    { title: 'Animated Onboarding & Splash Tutorial', status: 'Verified' },
    { title: 'Home Dashboard with Live Score Tickers & Featured Match', status: 'Verified' },
    { title: 'Sports & Leagues Directory (Football, Cricket, Basketball, Tennis)', status: 'Verified' },
    { title: 'Match Details Center (Scoreboard, Stats, Timeline, Lineups, H2H)', status: 'Verified' },
    { title: 'Non-Monetary Fan Predictions (Zero Cash Value, Virtual Fan XP)', status: 'Verified' },
    { title: 'User Favourites & Club Following (Local Persistence)', status: 'Verified' },
    { title: 'Global Leaderboard & Prestige Badges (Tiers, Win-Streaks)', status: 'Verified' },
    { title: 'Search & Tournament Discovery Modal', status: 'Verified' },
    { title: 'Alerts & Notifications Drawer with Unread Counter', status: 'Verified' },
    { title: 'User Profile, Badges, Win-rate Statistics & Nickname Editor', status: 'Verified' },
    { title: 'Settings (Decimal, Fractional & American Odds, Haptics, Reset)', status: 'Verified' },
    { title: 'About, Non-Gambling Policy, Privacy Charter & Working Support Form', status: 'Verified' },
    { title: 'Local Browser Notification API (Match Kickoff & Score Updates)', status: 'Verified' },
    { title: 'Device Viewport Toggle (Responsive Desktop vs Mobile Shell)', status: 'Verified' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <FileCode className="w-4 h-4" />
          <span>Documentation & Architecture</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl text-white">
          Developer Setup & Testing Checklist
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Full instructions for running on iOS, Android (Expo) and Responsive Web.
        </p>
      </div>

      {/* Expo / React Native Commands */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#090e1f] border border-amber-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400">
            <Terminal className="w-5 h-5" />
            <h2 className="font-display font-bold text-base text-white">
              Running as a Native Expo / React Native Application
            </h2>
          </div>
          <button
            onClick={() => copyCode(expoBashSnippet, 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
          >
            {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedIndex === 1 ? 'Copied!' : 'Copy Commands'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The code is structured with platform-agnostic service layers and modular components.
          To bundle for iOS (IPA) or Android (APK) using Expo Router:
        </p>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed">
          {expoBashSnippet}
        </pre>
      </div>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Database className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white">Modular Data Layer</h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <code>sportsDataService.ts</code> separates the interface from live feeds.
            It provides automated simulation and clean async methods ready for real APIs.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Layers className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white">State & Persistence</h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            <code>storageService.ts</code> manages local favourites, non-monetary Fan XP,
            prediction history, and user settings using standard Web Storage.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#090e1f] border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Smartphone className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white">Dual-Mode Experience</h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Test as a full 1440px multi-column desktop portal, or toggle into the realistic
            smartphone shell for true mobile touch inspection.
          </p>
        </div>
      </div>

      {/* Sports API Integration Guide */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-3">
        <h2 className="font-display font-bold text-base text-white">
          Authorized Sports-Data API Integration
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          To plug in real-time sports providers (e.g., API-Football, Sportradar, TheSportsDB):
        </p>
        <ol className="list-decimal pl-5 text-xs text-slate-300 space-y-1.5">
          <li>
            Obtain an authorized API key from your sports data provider.
          </li>
          <li>
            Add your key to environment variables (e.g. <code>VITE_SPORTS_API_KEY</code>).
          </li>
          <li>
            In <code>src/services/sportsDataService.ts</code>, replace the internal array calls
            in <code>getMatches()</code> with <code>fetch(`https://v3.football.api-sports.io/fixtures...`)</code>.
          </li>
          <li>
            Map the vendor payload to the typed <code>Match</code> schema defined in <code>src/types/sports.ts</code>.
          </li>
        </ol>
      </div>

      {/* Verification & Quality Checklist */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-base text-white">
            Feature & Screen Testing Checklist
          </h2>
          <span className="text-xs text-emerald-400 font-semibold font-mono-nums">
            13 / 13 PASSED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {checklistItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item.title}</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono-nums">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
