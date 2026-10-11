import React, { useState } from 'react';
import { useSports } from '../context/SportsContext';
import { OddsFormat } from '../types/sports';
import {
  Bell,
  Sliders,
  Smartphone,
  Trash2,
  HelpCircle,
  CheckCircle,
  Eye,
  Shield,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetAllAppData,
    setIsOnboardingOpen,
    setCurrentScreen,
    browserNotificationPermission,
    requestNotificationPermission,
    sendTestBrowserNotification,
    matchAlerts,
  } = useSports();

  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [testSent, setTestSent] = useState<boolean>(false);

  const activeAlertsCount = Object.keys(matchAlerts).length;

  const handleTestNotification = async () => {
    const success = await sendTestBrowserNotification();
    if (success) {
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    }
  };

  const handleOddsChange = (fmt: OddsFormat) => {
    updateSettings({ oddsFormat: fmt });
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-14">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">
            Application Settings
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Customize odds representation, simulated haptics, and feed behavior.
          </p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Saved</span>
          </div>
        )}
      </div>

      {/* 1. Odds Format Preference */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amber-400" />
          <h2 className="font-display font-bold text-sm text-white">
            Odds Multiplier Display Format
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select how non-monetary consensus ratios and prediction payouts are formatted across fixtures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
          {[
            { id: 'decimal', label: 'Decimal', sample: '1.85 / 3.40' },
            { id: 'fractional', label: 'Fractional', sample: '5/6 / 12/5' },
            { id: 'american', label: 'American Moneyline', sample: '-120 / +240' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleOddsChange(item.id as OddsFormat)}
              className={`p-3 rounded-xl border text-left transition-all ${
                settings.oddsFormat === item.id
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold">{item.label}</div>
              <div className="text-[11px] font-mono-nums text-slate-400 mt-1">
                {item.sample}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Device View Mode Preview Toggle */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <h2 className="font-display font-bold text-sm text-white">
            Device Viewport Simulator
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Test CR7BET in responsive widescreen mode or inside an iPhone 16 Pro / Android style mobile shell.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => {
              updateSettings({ deviceViewMode: 'responsive' });
              triggerSaveToast();
            }}
            className={`p-3 rounded-xl border text-left transition-all ${
              settings.deviceViewMode === 'responsive'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold">Responsive Desktop / Tablet</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Expands naturally to widescreen displays
            </div>
          </button>

          <button
            onClick={() => {
              updateSettings({ deviceViewMode: 'mobile_shell' });
              triggerSaveToast();
            }}
            className={`p-3 rounded-xl border text-left transition-all ${
              settings.deviceViewMode === 'mobile_shell'
                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold">Mobile Shell Frame</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Previews smartphone notch & native touch container
            </div>
          </button>
        </div>
      </div>

      {/* 3. Alerts & Notification Preferences */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-400" />
            <h2 className="font-display font-bold text-sm text-white">
              Browser Push & Match-Specific Alerts
            </h2>
          </div>

          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
              browserNotificationPermission === 'granted'
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : browserNotificationPermission === 'denied'
                ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {browserNotificationPermission === 'granted'
              ? 'Permission: Granted'
              : browserNotificationPermission === 'denied'
              ? 'Permission: Blocked'
              : 'Permission: Prompt Needed'}
          </span>
        </div>

        {/* Browser Permission Action Box */}
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-white">
              Native Web Notification API
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {activeAlertsCount} match{activeAlertsCount === 1 ? '' : 'es'} currently configured for kickoff and score updates.
            </div>
          </div>

          <div className="flex items-center gap-2">
            {browserNotificationPermission !== 'granted' && (
              <button
                onClick={requestNotificationPermission}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shrink-0"
              >
                Request Permission
              </button>
            )}
            <button
              onClick={handleTestNotification}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors shrink-0"
            >
              {testSent ? '✓ Sent Test Alert' : 'Send Test Alert'}
            </button>
          </div>
        </div>

        <div className="space-y-3 divide-y divide-slate-800/80">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Instant Goal & Match Alerts
              </div>
              <div className="text-[11px] text-slate-400">
                Trigger push updates when scores change
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.goalAlerts}
              onChange={(e) => {
                updateSettings({ goalAlerts: e.target.checked });
                triggerSaveToast();
              }}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Prediction Settled Alerts
              </div>
              <div className="text-[11px] text-slate-400">
                Receive notification when non-cash Fan XP results resolve
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.predictionSettledAlerts}
              onChange={(e) => {
                updateSettings({ predictionSettledAlerts: e.target.checked });
                triggerSaveToast();
              }}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Simulated Haptic & Chime Audio
              </div>
              <div className="text-[11px] text-slate-400">
                Play subtle dual-frequency audio chime when goal alerts fire
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.hapticFeedback}
              onChange={(e) => {
                updateSettings({ hapticFeedback: e.target.checked });
                triggerSaveToast();
              }}
              className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Tutorial & Onboarding Replay */}
      <div className="p-5 rounded-2xl bg-[#090e1f] border border-slate-800 flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-sm text-white">
            Replay Interactive Tutorial
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Review features, prediction mechanics, and anti-gambling safety standards.
          </p>
        </div>
        <button
          onClick={() => setIsOnboardingOpen(true)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Launch Tutorial</span>
        </button>
      </div>

      {/* 5. Danger Zone: Reset Local Data */}
      <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
        <div className="flex items-center gap-2 text-rose-300">
          <Trash2 className="w-4 h-4 text-rose-400" />
          <h2 className="font-display font-bold text-sm">
            Reset Application Cache & Data
          </h2>
        </div>
        <p className="text-xs text-rose-300/80 leading-relaxed">
          Reset all stored favorite teams, predictions, points, and preferences to original defaults.
        </p>

        {confirmReset ? (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                resetAllAppData();
                setConfirmReset(false);
                triggerSaveToast();
              }}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Yes, Confirm Reset
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-rose-900/30 text-rose-400 border border-rose-800/60 rounded-xl text-xs font-semibold transition-colors"
          >
            Clear Local Data
          </button>
        )}
      </div>
    </div>
  );
};
