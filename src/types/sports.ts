export type SportType = 'football' | 'cricket' | 'basketball' | 'tennis';

export type MatchStatus = 'LIVE' | 'UPCOMING' | 'FINISHED' | 'POSTPONED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  sport: SportType;
  country: string;
  primaryColor?: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'sub' | 'wicket' | 'six' | 'four' | 'ace' | 'break_point' | 'three_pointer' | 'dunk' | 'var';
  teamId: string;
  player: string;
  detail?: string;
}

export interface MatchStats {
  possession?: [number, number]; // [home, away] %
  shotsTotal?: [number, number];
  shotsOnTarget?: [number, number];
  corners?: [number, number];
  fouls?: [number, number];
  yellowCards?: [number, number];
  redCards?: [number, number];
  expectedGoals?: [number, number];
  // Cricket specific
  overs?: [string, string];
  runRate?: [number, number];
  extras?: [number, number];
  // Basketball specific
  rebounds?: [number, number];
  assists?: [number, number];
  threePointers?: [number, number];
  freeThrows?: [number, number];
  // Tennis specific
  aces?: [number, number];
  doubleFaults?: [number, number];
  breakPointsConverted?: [string, string];
  firstServePercentage?: [number, number];
}

export interface PlayerLineup {
  id: string;
  name: string;
  number: number;
  position: string;
  isCaptain?: boolean;
}

export interface MatchLineups {
  formationHome?: string;
  formationAway?: string;
  homeStarting: PlayerLineup[];
  awayStarting: PlayerLineup[];
  homeSubs?: PlayerLineup[];
  awaySubs?: PlayerLineup[];
}

export interface HeadToHeadMatch {
  date: string;
  homeScore: number;
  awayScore: number;
  homeTeam: string;
  awayTeam: string;
  competition: string;
}

export interface Match {
  id: string;
  sport: SportType;
  leagueId: string;
  leagueName: string;
  leagueCountry: string;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  startTime: string; // ISO string
  minute?: number; // For live match
  period?: string; // "1st Half", "2nd Half", "Q3", "Set 2", "Innings 2"
  homeScore: number;
  awayScore: number;
  homeSubScore?: string; // E.g. cricket wickets "178/4" or tennis sets "6-4, 3-2"
  awaySubScore?: string;
  venue: string;
  referee?: string;
  stats?: MatchStats;
  events?: MatchEvent[];
  lineups?: MatchLineups;
  h2h?: HeadToHeadMatch[];
  // Community prediction odds (informational & non-monetary consensus)
  predictionConsensus: {
    homeWin: number; // Percentage, e.g. 52
    draw?: number;   // E.g. 24
    awayWin: number; // E.g. 24
    totalVotes: number;
  };
  oddsDisplay: {
    home: number;
    draw?: number;
    away: number;
  };
}

export interface League {
  id: string;
  name: string;
  sport: SportType;
  country: string;
  icon: string;
  standings?: LeagueStandingRow[];
}

export interface LeagueStandingRow {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
  goalDiff: number;
}

export interface UserPrediction {
  id: string;
  matchId: string;
  matchTitle: string;
  sport: SportType;
  predictedChoice: 'HOME' | 'DRAW' | 'AWAY' | 'OVER_2_5' | 'UNDER_2_5';
  predictedChoiceLabel: string;
  pointsStaked: number; // Virtual fan points (strictly non-cash)
  potentialReturn: number;
  oddsRatio: number;
  placedAt: string;
  status: 'PENDING' | 'WON' | 'LOST';
  resolvedScore?: string;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  avatarSeed: string;
  badge: 'Master' | 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  fanPoints: number;
  accuracy: number; // Percentage, e.g. 78%
  streak: number; // Current win streak
  totalPredictions: number;
  isCurrentUser?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'goal' | 'match_start' | 'prediction_settled' | 'leaderboard';
  read: boolean;
  matchId?: string;
}

export interface MatchAlertSetting {
  matchId: string;
  matchStart: boolean;
  scoreUpdates: boolean;
  notifiedStart?: boolean;
  lastNotifiedHomeScore?: number;
  lastNotifiedAwayScore?: number;
}

export type OddsFormat = 'decimal' | 'fractional' | 'american';

export interface UserSettings {
  oddsFormat: OddsFormat;
  notificationsEnabled: boolean;
  goalAlerts: boolean;
  predictionSettledAlerts: boolean;
  hapticFeedback: boolean;
  compactCards: boolean;
  deviceViewMode: 'responsive' | 'mobile_shell';
}

export interface UserProfile {
  id: string;
  username: string;
  handle: string;
  avatarSeed: string;
  fanPoints: number;
  tier: 'Diamond' | 'Master' | 'Gold' | 'Silver';
  rankPosition: number;
  favoriteTeamIds: string[];
  favoriteLeagueIds: string[];
  winStreak: number;
  highestStreak: number;
  predictionsWon: number;
  predictionsLost: number;
}
