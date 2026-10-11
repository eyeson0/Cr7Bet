import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  League,
  Match,
  MatchAlertSetting,
  NotificationItem,
  SportType,
  UserPrediction,
  UserProfile,
  UserSettings,
} from '../types/sports';
import { sportsDataService } from '../services/sportsDataService';
import { storageService } from '../services/storageService';
import { notificationService } from '../services/notificationService';

export type ScreenTab =
  | 'home'
  | 'leagues'
  | 'predictions'
  | 'favorites'
  | 'leaderboard'
  | 'profile'
  | 'settings'
  | 'about'
  | 'guide';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  matchId?: string;
  type: 'goal' | 'match_start' | 'info';
}

interface SportsContextType {
  // Screen & Navigation
  currentScreen: ScreenTab;
  setCurrentScreen: (screen: ScreenTab) => void;
  selectedMatchId: string | null;
  openMatchDetails: (matchId: string) => void;
  closeMatchDetails: () => void;

  // Modals
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: { matches: Match[]; leagues: League[] };

  // Data & Filters
  matches: Match[];
  leagues: League[];
  activeSport: SportType | 'all';
  setActiveSport: (sport: SportType | 'all') => void;
  activeStatusFilter: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED';
  setActiveStatusFilter: (status: 'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED') => void;
  isLoading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;

  // Simulation
  isLiveSimulating: boolean;
  toggleLiveSimulation: () => void;

  // Favorites
  favoriteTeamIds: string[];
  favoriteLeagueIds: string[];
  toggleFavoriteTeam: (teamId: string) => void;
  toggleFavoriteLeague: (leagueId: string) => void;
  isFavoriteTeam: (teamId: string) => boolean;

  // Match Specific Alerts (Browser Notification API)
  matchAlerts: Record<string, MatchAlertSetting>;
  browserNotificationPermission: NotificationPermission;
  requestNotificationPermission: () => Promise<NotificationPermission>;
  toggleMatchStartAlert: (match: Match) => Promise<boolean>;
  toggleScoreUpdateAlert: (match: Match) => Promise<boolean>;
  isMatchStartAlertActive: (matchId: string) => boolean;
  isScoreUpdateAlertActive: (matchId: string) => boolean;
  sendTestBrowserNotification: () => Promise<boolean>;

  // In-app floating toasts
  toasts: ToastItem[];
  dismissToast: (id: string) => void;

  // Predictions & Points (Non-monetary)
  predictions: UserPrediction[];
  placePrediction: (
    match: Match,
    choice: 'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5',
    choiceLabel: string,
    points: number,
    odds: number
  ) => boolean;

  // User & Settings
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  settings: UserSettings;
  updateSettings: (updates: Partial<UserSettings>) => void;
  resetAllAppData: () => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
}

const SportsContext = createContext<SportsContextType | undefined>(undefined);

export const SportsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenTab>('home');
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);

  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !storageService.isOnboardingDone();
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeSport, setActiveSport] = useState<SportType | 'all'>('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING' | 'FINISHED'>('ALL');

  const [matches, setMatches] = useState<Match[]>([]);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(() =>
    sportsDataService.getIsSimulating()
  );

  const [userProfile, setUserProfile] = useState<UserProfile>(() =>
    storageService.getUserProfile()
  );
  const [predictions, setPredictions] = useState<UserPrediction[]>(() =>
    storageService.getPredictions()
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    storageService.getNotifications()
  );
  const [settings, setSettings] = useState<UserSettings>(() =>
    storageService.getSettings()
  );

  // Match Specific Alerts State
  const [matchAlerts, setMatchAlerts] = useState<Record<string, MatchAlertSetting>>(() =>
    storageService.getMatchAlerts()
  );
  const [browserNotificationPermission, setBrowserNotificationPermission] =
    useState<NotificationPermission>(() => notificationService.getPermission());

  // In-app floating toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const unsubscribe = notificationService.subscribeToast((toast) => {
      setToasts((prev) => [toast, ...prev.slice(0, 3)]);
      setTimeout(() => {
        dismissToast(toast.id);
      }, 5500);
    });
    return unsubscribe;
  }, [dismissToast]);

  const requestNotificationPermission = async () => {
    const perm = await notificationService.requestPermission();
    setBrowserNotificationPermission(perm);
    return perm;
  };

  const toggleMatchStartAlert = async (match: Match): Promise<boolean> => {
    if (browserNotificationPermission === 'default') {
      await requestNotificationPermission();
    }
    const current = matchAlerts[match.id] || {
      matchId: match.id,
      matchStart: false,
      scoreUpdates: false,
    };
    const nextVal = !current.matchStart;
    storageService.setMatchAlert(match.id, {
      matchStart: nextVal,
      notifiedStart: match.status === 'LIVE' || match.status === 'FINISHED',
    });
    setMatchAlerts(storageService.getMatchAlerts());

    if (nextVal) {
      notificationService.sendNotification(
        `Kickoff Alert Set: ${match.homeTeam.shortName} vs ${match.awayTeam.shortName} 🔔`,
        {
          body: `You will be notified immediately when this fixture kicks off at ${match.venue}.`,
          matchId: match.id,
          type: 'match_start',
        }
      );
    }
    return nextVal;
  };

  const toggleScoreUpdateAlert = async (match: Match): Promise<boolean> => {
    if (browserNotificationPermission === 'default') {
      await requestNotificationPermission();
    }
    const current = matchAlerts[match.id] || {
      matchId: match.id,
      matchStart: false,
      scoreUpdates: false,
    };
    const nextVal = !current.scoreUpdates;
    storageService.setMatchAlert(match.id, {
      scoreUpdates: nextVal,
      lastNotifiedHomeScore: match.homeScore,
      lastNotifiedAwayScore: match.awayScore,
    });
    setMatchAlerts(storageService.getMatchAlerts());

    if (nextVal) {
      notificationService.sendNotification(
        `Score Alerts Enabled: ${match.homeTeam.shortName} vs ${match.awayTeam.shortName} ⚡`,
        {
          body: `Instant alerts will fire whenever either team scores or changes score!`,
          matchId: match.id,
          type: 'goal',
        }
      );
    }
    return nextVal;
  };

  const isMatchStartAlertActive = (matchId: string) => {
    return !!matchAlerts[matchId]?.matchStart;
  };

  const isScoreUpdateAlertActive = (matchId: string) => {
    return !!matchAlerts[matchId]?.scoreUpdates;
  };

  const sendTestBrowserNotification = async () => {
    const res = await notificationService.sendTestNotification();
    setBrowserNotificationPermission(notificationService.getPermission());
    return res;
  };

  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [fetchedMatches, fetchedLeagues] = await Promise.all([
        sportsDataService.getMatches(),
        sportsDataService.getLeagues(),
      ]);
      setMatches(fetchedMatches);
      setLeagues(fetchedLeagues);
    } catch (err: unknown) {
      console.error('Failed to load sports data', err);
      setError('Could not connect to sports data feed. Check connection and retry.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Periodic match polling/simulation sync
  useEffect(() => {
    const interval = setInterval(async () => {
      if (isLiveSimulating) {
        const updated = await sportsDataService.getMatches();
        setMatches(updated);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  // Monitor match alerts when matches update
  const prevMatchesRef = useRef<Match[]>([]);
  useEffect(() => {
    if (prevMatchesRef.current.length === 0) {
      prevMatchesRef.current = matches;
      return;
    }

    const alerts = storageService.getMatchAlerts();
    let alertsChanged = false;

    matches.forEach((curr) => {
      const alert = alerts[curr.id];
      if (!alert) return;

      const prev = prevMatchesRef.current.find((m) => m.id === curr.id);
      if (!prev) return;

      // 1. Kickoff Start Alert
      if (alert.matchStart && !alert.notifiedStart) {
        if (prev.status === 'UPCOMING' && curr.status === 'LIVE') {
          notificationService.sendNotification(
            `KICKOFF! ${curr.homeTeam.name} vs ${curr.awayTeam.name} ⚽`,
            {
              body: `Match is now underway at ${curr.venue}. Tap to view live stats & scoreline!`,
              matchId: curr.id,
              type: 'match_start',
            }
          );

          const notifItem: NotificationItem = {
            id: `notif-start-${curr.id}-${Date.now()}`,
            title: `Kickoff: ${curr.homeTeam.name} vs ${curr.awayTeam.name}`,
            message: `The match has officially begun at ${curr.venue}. Current score: ${curr.homeScore} - ${curr.awayScore}.`,
            timestamp: 'Just now',
            type: 'match_start',
            read: false,
            matchId: curr.id,
          };
          setNotifications((prevN) => {
            const updatedN = [notifItem, ...prevN];
            storageService.saveNotifications(updatedN);
            return updatedN;
          });

          alert.notifiedStart = true;
          alertsChanged = true;
        }
      }

      // 2. Score Update / Goal Alert
      if (alert.scoreUpdates) {
        const scoreChanged =
          curr.homeScore !== prev.homeScore || curr.awayScore !== prev.awayScore;
        if (scoreChanged) {
          const scoringTeam =
            curr.homeScore > prev.homeScore
              ? curr.homeTeam.name
              : curr.awayTeam.name;

          notificationService.sendNotification(
            `SCORE ALERT! ${scoringTeam} Scores! 💥`,
            {
              body: `${curr.homeTeam.shortName} ${curr.homeScore} - ${curr.awayScore} ${curr.awayTeam.shortName} (${curr.minute ? curr.minute + "'" : curr.period || 'LIVE'})`,
              matchId: curr.id,
              type: 'goal',
            }
          );

          const notifItem: NotificationItem = {
            id: `notif-score-${curr.id}-${Date.now()}`,
            title: `Score Alert: ${curr.homeTeam.shortName} ${curr.homeScore} - ${curr.awayScore} ${curr.awayTeam.shortName}`,
            message: `${scoringTeam} scored! Match clock: ${curr.minute ? curr.minute + "'" : curr.period || 'LIVE'}.`,
            timestamp: 'Just now',
            type: 'goal',
            read: false,
            matchId: curr.id,
          };
          setNotifications((prevN) => {
            const updatedN = [notifItem, ...prevN];
            storageService.saveNotifications(updatedN);
            return updatedN;
          });

          alert.lastNotifiedHomeScore = curr.homeScore;
          alert.lastNotifiedAwayScore = curr.awayScore;
          alertsChanged = true;
        }
      }
    });

    if (alertsChanged) {
      storageService.saveMatchAlerts(alerts);
      setMatchAlerts({ ...alerts });
    }

    prevMatchesRef.current = matches;
  }, [matches]);

  const refreshData = async () => {
    sportsDataService.manualRefreshFeed();
    await loadInitialData();
  };

  const toggleLiveSimulation = () => {
    const nextState = !isLiveSimulating;
    sportsDataService.setSimulation(nextState);
    setIsLiveSimulating(nextState);
  };

  const openMatchDetails = (matchId: string) => {
    setSelectedMatchId(matchId);
  };

  const closeMatchDetails = () => {
    setSelectedMatchId(null);
  };

  // Favorites Handlers
  const toggleFavoriteTeam = (teamId: string) => {
    setUserProfile((prev) => {
      const exists = prev.favoriteTeamIds.includes(teamId);
      const updatedTeams = exists
        ? prev.favoriteTeamIds.filter((id) => id !== teamId)
        : [...prev.favoriteTeamIds, teamId];

      const updatedProfile = { ...prev, favoriteTeamIds: updatedTeams };
      storageService.saveUserProfile(updatedProfile);
      return updatedProfile;
    });
  };

  const toggleFavoriteLeague = (leagueId: string) => {
    setUserProfile((prev) => {
      const exists = prev.favoriteLeagueIds.includes(leagueId);
      const updatedLeagues = exists
        ? prev.favoriteLeagueIds.filter((id) => id !== leagueId)
        : [...prev.favoriteLeagueIds, leagueId];

      const updatedProfile = { ...prev, favoriteLeagueIds: updatedLeagues };
      storageService.saveUserProfile(updatedProfile);
      return updatedProfile;
    });
  };

  const isFavoriteTeam = (teamId: string) => {
    return userProfile.favoriteTeamIds.includes(teamId);
  };

  // Non-monetary Prediction Handlers
  const placePrediction = (
    match: Match,
    choice: 'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5',
    choiceLabel: string,
    points: number,
    odds: number
  ): boolean => {
    if (points <= 0 || userProfile.fanPoints < points) {
      return false;
    }

    const newPrediction: UserPrediction = {
      id: `pred-${Date.now()}`,
      matchId: match.id,
      matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      sport: match.sport,
      predictedChoice: choice,
      predictedChoiceLabel: choiceLabel,
      pointsStaked: points,
      potentialReturn: Math.round(points * odds),
      oddsRatio: odds,
      placedAt: new Date().toISOString(),
      status: 'PENDING',
    };

    storageService.addPrediction(newPrediction);
    setPredictions((prev) => [newPrediction, ...prev]);

    // Update profile points
    setUserProfile((prev) => {
      const updated = {
        ...prev,
        fanPoints: Math.max(0, prev.fanPoints - points),
      };
      return updated;
    });

    // Add alert notification
    const alertNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Prediction Locked: ${choiceLabel}`,
      message: `${points} Fan Points placed on ${match.homeTeam.shortName} vs ${match.awayTeam.shortName} (${odds.toFixed(2)}x). Strictly non-monetary.`,
      timestamp: 'Just now',
      type: 'prediction_settled',
      read: false,
      matchId: match.id,
    };
    const updatedNotifs = [alertNotif, ...notifications];
    setNotifications(updatedNotifs);
    storageService.saveNotifications(updatedNotifs);

    return true;
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      storageService.saveUserProfile(updated);
      return updated;
    });
  };

  const updateSettings = (updates: Partial<UserSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...updates };
      storageService.saveSettings(updated);
      return updated;
    });
  };

  const resetAllAppData = () => {
    storageService.resetAllData();
    setUserProfile(storageService.getUserProfile());
    setPredictions(storageService.getPredictions());
    setNotifications(storageService.getNotifications());
    setSettings(storageService.getSettings());
    setIsOnboardingOpen(true);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    storageService.saveNotifications(updated);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const searchResults = searchQuery
    ? sportsDataService.search(searchQuery)
    : { matches: [], leagues: [] };

  return (
    <SportsContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedMatchId,
        openMatchDetails,
        closeMatchDetails,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        searchResults,
        matches,
        leagues,
        activeSport,
        setActiveSport,
        activeStatusFilter,
        setActiveStatusFilter,
        isLoading,
        error,
        refreshData,
        isLiveSimulating,
        toggleLiveSimulation,
        favoriteTeamIds: userProfile.favoriteTeamIds,
        favoriteLeagueIds: userProfile.favoriteLeagueIds,
        toggleFavoriteTeam,
        toggleFavoriteLeague,
        isFavoriteTeam,
        matchAlerts,
        browserNotificationPermission,
        requestNotificationPermission,
        toggleMatchStartAlert,
        toggleScoreUpdateAlert,
        isMatchStartAlertActive,
        isScoreUpdateAlertActive,
        sendTestBrowserNotification,
        toasts,
        dismissToast,
        predictions,
        placePrediction,
        userProfile,
        updateUserProfile,
        settings,
        updateSettings,
        resetAllAppData,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
      }}
    >
      {children}
    </SportsContext.Provider>
  );
};

export const useSports = () => {
  const context = useContext(SportsContext);
  if (!context) {
    throw new Error('useSports must be used within a SportsProvider');
  }
  return context;
};
