import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { storageService } from '../services/storageService';
import { ShieldCheck, Trophy, Sparkles, ChevronRight, X } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen } = useSports();
  const [step, setStep] = useState<number>(0);

  if (!isOnboardingOpen) return null;

  const slides = [
    {
      title: 'Welcome to CR7BET Sports Arena',
      subtitle: 'Next-Gen Sports Analytics & Non-Monetary Fan Predictions',
      desc: 'Follow live scores, advanced match stats, and real-time commentary across Football, Cricket, Basketball, and Tennis.',
      icon: Sparkles,
      highlight: 'Original sports intelligence platform with premium dark-gold architecture.',
    },
    {
      title: 'Pure Fan Predictions · Zero Gambling',
      subtitle: 'Skill-based contest with 100% non-monetary points',
      desc: 'Predict match winners, total goals, and momentum shifts using virtual Fan XP. Points have zero cash value and cannot be deposited or withdrawn.',
      icon: ShieldCheck,
      highlight: 'Completely free to play, safe for all sports enthusiasts worldwide.',
    },
    {
      title: 'Climb the Global Leaderboard',
      subtitle: 'Earn Master Badges & Build Win Streaks',
      desc: 'Compete against other sports tacticians, climb from Silver to Master Tier, track your prediction accuracy, and save your favourite teams.',
      icon: Trophy,
      highlight: 'You start with 14,200 Fan XP. Test your sports acumen today!',
    },
  ];

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    storageService.setOnboardingDone(true);
    setIsOnboardingOpen(false);
  };

  const CurrentIcon = slides[step].icon;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome and Onboarding"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
    >
      <div className="bg-[#0b1021] border border-amber-500/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        {/* Ambient golden glow */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Skip / Close button */}
        <button
          onClick={handleComplete}
          aria-label="Close Onboarding"
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Crest */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs font-display">
            CR7
          </div>
          <span className="font-display font-bold text-white text-base tracking-tight">
            CR7<span className="text-amber-400">BET</span> Onboarding
          </span>
        </div>

        {/* Icon & Slide Content */}
        <div className="text-center py-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-lg shadow-amber-500/10">
            <CurrentIcon className="w-8 h-8" />
          </div>

          <h2 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 text-wrap-balance">
            {slides[step].title}
          </h2>
          <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
            {slides[step].subtitle}
          </h3>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            {slides[step].desc}
          </p>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs text-amber-300/90 font-medium mb-6">
            {slides[step].highlight}
          </div>
        </div>

        {/* Progress Dots and Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <span>{step === slides.length - 1 ? 'Enter Arena' : 'Continue'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
