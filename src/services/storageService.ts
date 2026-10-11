import {
  MatchAlertSetting,
  NotificationItem,
  OddsFormat,
  UserPrediction,
  UserProfile,
  UserSettings,
} from '../types/sports';

const PROFILE_KEY = 'cr7bet_user_profile_v1';
const PREDICTIONS_KEY = 'cr7bet_user_predictions_v1';
const NOTIFICATIONS_KEY = 'cr7bet_notifications_v1';
const SETTINGS_KEY = 'cr7bet_settings_v1';
const ONBOARDING_COMPLETED_KEY = 'cr7bet_onboarding_done_v1';
const MATCH_ALERTS_KEY = 'cr7bet_match_alerts_v1';

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'usr-me',
  username: 'CR7MasterMind',
  handle: '@cr7_tactician',
  avatarSeed: 'champion',
  fanPoints: 14200, // Non-monetary prestige points
  tier: 'Diamond',
  rankPosition: 4,
  favoriteTeamIds: ['rma', 'ars', 'csk', 'lal'],
  favoriteLeagueIds: ['ucl', 'epl', 'ipl'],
  winStreak: 5,
  highestStreak: 8,
  predictionsWon: 28,
  predictionsLost: 8,
};

export const DEFAULT_SETTINGS: UserSettings = {
  oddsFormat: 'decimal',
  notificationsEnabled: true,
  goalAlerts: true,
  predictionSettledAlerts: true,
  hapticFeedback: true,
  compactCards: false,
  deviceViewMode: 'responsive',
};

export const INITIAL_PREDICTIONS: UserPrediction[] = [
  {
    id: 'pred-101',
    matchId: 'fb-01',
    matchTitle: 'Madrid Royals vs Manchester Sky',
    sport: 'football',
    predictedChoice: 'HOME',
    predictedChoiceLabel: 'Madrid Royals Win',
    pointsStaked: 500,
    potentialReturn: 910,
    oddsRatio: 1.82,
    placedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    status: 'PENDING',
  },
  {
    id: 'pred-102',
    matchId: 'ck-01',
    matchTitle: 'Chennai Super Pride vs Mumbai Titans',
    sport: 'cricket',
    predictedChoice: 'HOME',
    predictedChoiceLabel: 'Chennai Super Pride Win',
    pointsStaked: 350,
    potentialReturn: 658,
    oddsRatio: 1.88,
    placedAt: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    status: 'PENDING',
  },
  {
    id: 'pred-103',
    matchId: 'fb-04',
    matchTitle: 'Inter Milano vs Juventus Zebra',
    sport: 'football',
    predictedChoice: 'HOME',
    predictedChoiceLabel: 'Inter Milano Win',
    pointsStaked: 400,
    potentialReturn: 840,
    oddsRatio: 2.10,
    placedAt: new Date(Date.now() - 200 * 60 * 1000).toISOString(),
    status: 'WON',
    resolvedScore: '3 - 2 FT',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'GOAL! Madrid Royals 2 - 1 Manchester Sky',
    message: 'Jude Bellingham heads in a sublime cross in the 58th minute.',
    timestamp: '10m ago',
    type: 'goal',
    read: false,
    matchId: 'fb-01',
  },
  {
    id: 'notif-2',
    title: 'Prediction Resolved: WON (+840 Fan Points)',
    message: 'Your pick Inter Milano Win finished 3-2. Non-monetary prestige points added!',
    timestamp: '1h ago',
    type: 'prediction_settled',
    read: false,
    matchId: 'fb-04',
  },
  {
    id: 'notif-3',
    title: 'Match Starting Soon: North London vs Chelsea',
    message: 'Kickoff at Emirates Arena in 10 minutes. Check line-ups.',
    timestamp: '2h ago',
    type: 'match_start',
    read: true,
    matchId: 'fb-02',
  },
];

class StorageService {
  public getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      return data ? JSON.parse(data) : DEFAULT_USER_PROFILE;
    } catch {
      return DEFAULT_USER_PROFILE;
    }
  }

  public saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile in localStorage', e);
    }
  }

  public getPredictions(): UserPrediction[] {
    try {
      const data = localStorage.getItem(PREDICTIONS_KEY);
      return data ? JSON.parse(data) : INITIAL_PREDICTIONS;
    } catch {
      return INITIAL_PREDICTIONS;
    }
  }

  public savePredictions(predictions: UserPrediction[]): void {
    try {
      localStorage.setItem(PREDICTIONS_KEY, JSON.stringify(predictions));
    } catch (e) {
      console.warn('Failed to save predictions in localStorage', e);
    }
  }

  public addPrediction(pred: UserPrediction): void {
    const current = this.getPredictions();
    const updated = [pred, ...current];
    this.savePredictions(updated);

    // Deduct fan points
    const profile = this.getUserProfile();
    profile.fanPoints = Math.max(0, profile.fanPoints - pred.pointsStaked);
    this.saveUserProfile(profile);
  }

  public getNotifications(): NotificationItem[] {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_KEY);
      return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  public saveNotifications(notifs: NotificationItem[]): void {
    try {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
    } catch (e) {
      console.warn('Failed to save notifications in localStorage', e);
    }
  }

  public getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? JSON.parse(data) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings in localStorage', e);
    }
  }

  public getMatchAlerts(): Record<string, MatchAlertSetting> {
    try {
      const data = localStorage.getItem(MATCH_ALERTS_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  public saveMatchAlerts(alerts: Record<string, MatchAlertSetting>): void {
    try {
      localStorage.setItem(MATCH_ALERTS_KEY, JSON.stringify(alerts));
    } catch (e) {
      console.warn('Failed to save match alerts in localStorage', e);
    }
  }

  public setMatchAlert(matchId: string, alert: Partial<MatchAlertSetting>): MatchAlertSetting {
    const alerts = this.getMatchAlerts();
    const current = alerts[matchId] || {
      matchId,
      matchStart: false,
      scoreUpdates: false,
    };
    const updated: MatchAlertSetting = { ...current, ...alert };

    // If both are false, remove it to keep clean storage
    if (!updated.matchStart && !updated.scoreUpdates) {
      delete alerts[matchId];
    } else {
      alerts[matchId] = updated;
    }
    this.saveMatchAlerts(alerts);
    return updated;
  }

  public isOnboardingDone(): boolean {
    try {
      return localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public setOnboardingDone(done: boolean): void {
    try {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, done ? 'true' : 'false');
    } catch (e) {
      console.warn('Failed to save onboarding flag', e);
    }
  }

  public resetAllData(): void {
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(PREDICTIONS_KEY);
      localStorage.removeItem(NOTIFICATIONS_KEY);
      localStorage.removeItem(SETTINGS_KEY);
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    } catch (e) {
      console.warn('Failed to reset localStorage data', e);
    }
  }
}

export const storageService = new StorageService();

// Helper to format non-monetary odds display
export function formatOdds(decimalOdds: number, format: OddsFormat): string {
  if (format === 'decimal') {
    return decimalOdds.toFixed(2);
  }
  if (format === 'fractional') {
    // Approximate fractional odds
    const val = decimalOdds - 1;
    if (Math.abs(val - 0.5) < 0.05) return '1/2';
    if (Math.abs(val - 1.0) < 0.05) return '1/1 (Evens)';
    if (Math.abs(val - 1.5) < 0.05) return '3/2';
    if (Math.abs(val - 2.0) < 0.05) return '2/1';
    if (Math.abs(val - 0.8) < 0.05) return '4/5';
    if (Math.abs(val - 2.5) < 0.05) return '5/2';
    return `${(val * 10).toFixed(0)}/10`;
  }
  if (format === 'american') {
    if (decimalOdds >= 2.0) {
      return `+${Math.round((decimalOdds - 1) * 100)}`;
    } else {
      return `-${Math.round(100 / (decimalOdds - 1))}`;
    }
  }
  return decimalOdds.toFixed(2);
}
