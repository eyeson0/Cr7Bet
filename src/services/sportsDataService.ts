import { League, Match, SportType, LeaderboardUser } from '../types/sports';

// Base sample mock matches across 4 sports
export const INITIAL_MATCHES: Match[] = [
  // FOOTBALL MATCHES
  {
    id: 'fb-01',
    sport: 'football',
    leagueId: 'ucl',
    leagueName: 'UEFA Champions League',
    leagueCountry: 'Europe',
    homeTeam: {
      id: 'rma',
      name: 'Madrid Royals',
      shortName: 'MAD',
      logo: '👑',
      sport: 'football',
      country: 'Spain',
      primaryColor: '#ffffff',
    },
    awayTeam: {
      id: 'mci',
      name: 'Manchester Sky',
      shortName: 'MCI',
      logo: '⚡',
      sport: 'football',
      country: 'England',
      primaryColor: '#6ee7b7',
    },
    status: 'LIVE',
    startTime: new Date(Date.now() - 67 * 60 * 1000).toISOString(),
    minute: 68,
    period: '2nd Half',
    homeScore: 2,
    awayScore: 1,
    venue: 'Santiago Grand Stadium, Madrid',
    referee: 'Clément Turpin',
    predictionConsensus: {
      homeWin: 54,
      draw: 22,
      awayWin: 24,
      totalVotes: 14820,
    },
    oddsDisplay: {
      home: 1.82,
      draw: 3.45,
      away: 4.10,
    },
    stats: {
      possession: [52, 48],
      shotsTotal: [14, 11],
      shotsOnTarget: [6, 4],
      corners: [5, 4],
      fouls: [8, 9],
      yellowCards: [1, 2],
      redCards: [0, 0],
      expectedGoals: [1.88, 1.24],
    },
    events: [
      { id: 'ev-1', minute: 18, type: 'goal', teamId: 'rma', player: 'Vinicius Jr.', detail: 'Curled into top corner' },
      { id: 'ev-2', minute: 34, type: 'yellow_card', teamId: 'mci', player: 'Rodri', detail: 'Tactical foul' },
      { id: 'ev-3', minute: 42, type: 'goal', teamId: 'mci', player: 'Phil Foden', detail: 'Left-foot drive from 20 yards' },
      { id: 'ev-4', minute: 58, type: 'goal', teamId: 'rma', player: 'Jude Bellingham', detail: 'Header from cross' },
      { id: 'ev-5', minute: 63, type: 'sub', teamId: 'mci', player: 'Kevin De Bruyne', detail: 'Substituted in' },
    ],
    lineups: {
      formationHome: '4-3-1-2',
      formationAway: '4-2-3-1',
      homeStarting: [
        { id: 'p1', name: 'Courtois', number: 1, position: 'GK' },
        { id: 'p2', name: 'Carvajal', number: 2, position: 'DF', isCaptain: true },
        { id: 'p3', name: 'Militao', number: 3, position: 'DF' },
        { id: 'p4', name: 'Rudiger', number: 22, position: 'DF' },
        { id: 'p5', name: 'Mendy', number: 23, position: 'DF' },
        { id: 'p6', name: 'Valverde', number: 15, position: 'MF' },
        { id: 'p7', name: 'Camavinga', number: 12, position: 'MF' },
        { id: 'p8', name: 'Kroos', number: 8, position: 'MF' },
        { id: 'p9', name: 'Bellingham', number: 5, position: 'MF' },
        { id: 'p10', name: 'Rodrygo', number: 11, position: 'FW' },
        { id: 'p11', name: 'Vinicius Jr.', number: 7, position: 'FW' },
      ],
      awayStarting: [
        { id: 'p12', name: 'Ederson', number: 31, position: 'GK' },
        { id: 'p13', name: 'Walker', number: 2, position: 'DF', isCaptain: true },
        { id: 'p14', name: 'Dias', number: 3, position: 'DF' },
        { id: 'p15', name: 'Akanji', number: 25, position: 'DF' },
        { id: 'p16', name: 'Gvardiol', number: 24, position: 'DF' },
        { id: 'p17', name: 'Rodri', number: 16, position: 'MF' },
        { id: 'p18', name: 'Kovacic', number: 8, position: 'MF' },
        { id: 'p19', name: 'Bernardo', number: 20, position: 'MF' },
        { id: 'p20', name: 'Foden', number: 47, position: 'MF' },
        { id: 'p21', name: 'Grealish', number: 10, position: 'FW' },
        { id: 'p22', name: 'Haaland', number: 9, position: 'FW' },
      ],
    },
    h2h: [
      { date: '17 Apr 2024', homeTeam: 'Manchester Sky', awayTeam: 'Madrid Royals', homeScore: 1, awayScore: 1, competition: 'UCL' },
      { date: '09 Apr 2024', homeTeam: 'Madrid Royals', awayTeam: 'Manchester Sky', homeScore: 3, awayScore: 3, competition: 'UCL' },
      { date: '17 May 2023', homeTeam: 'Manchester Sky', awayTeam: 'Madrid Royals', homeScore: 4, awayScore: 0, competition: 'UCL' },
    ],
  },
  {
    id: 'fb-02',
    sport: 'football',
    leagueId: 'epl',
    leagueName: 'Premier League',
    leagueCountry: 'England',
    homeTeam: {
      id: 'ars',
      name: 'North London Cannon',
      shortName: 'ARS',
      logo: '🔴',
      sport: 'football',
      country: 'England',
      primaryColor: '#ef4444',
    },
    awayTeam: {
      id: 'che',
      name: 'Chelsea Blues',
      shortName: 'CHE',
      logo: '🦁',
      sport: 'football',
      country: 'England',
      primaryColor: '#3b82f6',
    },
    status: 'LIVE',
    startTime: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    minute: 32,
    period: '1st Half',
    homeScore: 1,
    awayScore: 0,
    venue: 'Emirates Arena, London',
    referee: 'Anthony Taylor',
    predictionConsensus: {
      homeWin: 61,
      draw: 23,
      awayWin: 16,
      totalVotes: 9420,
    },
    oddsDisplay: {
      home: 1.62,
      draw: 3.80,
      away: 5.20,
    },
    stats: {
      possession: [58, 42],
      shotsTotal: [8, 3],
      shotsOnTarget: [4, 1],
      corners: [4, 1],
      fouls: [4, 6],
      yellowCards: [0, 1],
      redCards: [0, 0],
      expectedGoals: [0.94, 0.28],
    },
    events: [
      { id: 'ev-ars-1', minute: 14, type: 'goal', teamId: 'ars', player: 'Bukayo Saka', detail: 'Curler inside the box' },
      { id: 'ev-che-1', minute: 26, type: 'yellow_card', teamId: 'che', player: 'Moises Caicedo', detail: 'Late tackle' },
    ],
    lineups: {
      formationHome: '4-3-3',
      formationAway: '4-2-3-1',
      homeStarting: [
        { id: 'a1', name: 'Raya', number: 22, position: 'GK' },
        { id: 'a2', name: 'White', number: 4, position: 'DF' },
        { id: 'a3', name: 'Saliba', number: 2, position: 'DF' },
        { id: 'a4', name: 'Gabriel', number: 6, position: 'DF' },
        { id: 'a5', name: 'Timber', number: 12, position: 'DF' },
        { id: 'a6', name: 'Rice', number: 41, position: 'MF' },
        { id: 'a7', name: 'Partey', number: 5, position: 'MF' },
        { id: 'a8', name: 'Odegaard', number: 8, position: 'MF', isCaptain: true },
        { id: 'a9', name: 'Saka', number: 7, position: 'FW' },
        { id: 'a10', name: 'Havertz', number: 29, position: 'FW' },
        { id: 'a11', name: 'Martinelli', number: 11, position: 'FW' },
      ],
      awayStarting: [
        { id: 'c1', name: 'Sanchez', number: 1, position: 'GK' },
        { id: 'c2', name: 'James', number: 24, position: 'DF', isCaptain: true },
        { id: 'c3', name: 'Fofana', number: 29, position: 'DF' },
        { id: 'c4', name: 'Colwill', number: 6, position: 'DF' },
        { id: 'c5', name: 'Cucurella', number: 3, position: 'DF' },
        { id: 'c6', name: 'Caicedo', number: 25, position: 'MF' },
        { id: 'c7', name: 'Enzo', number: 8, position: 'MF' },
        { id: 'c8', name: 'Madueke', number: 11, position: 'FW' },
        { id: 'c9', name: 'Palmer', number: 20, position: 'MF' },
        { id: 'c10', name: 'Neto', number: 7, position: 'FW' },
        { id: 'c11', name: 'Jackson', number: 15, position: 'FW' },
      ],
    },
  },
  {
    id: 'fb-03',
    sport: 'football',
    leagueId: 'laliga',
    leagueName: 'La Liga EA Sports',
    leagueCountry: 'Spain',
    homeTeam: {
      id: 'bar',
      name: 'Catalonia FC',
      shortName: 'BAR',
      logo: '🔵🔴',
      sport: 'football',
      country: 'Spain',
      primaryColor: '#1d4ed8',
    },
    awayTeam: {
      id: 'atm',
      name: 'Atletico Red-White',
      shortName: 'ATM',
      logo: '🛡️',
      sport: 'football',
      country: 'Spain',
      primaryColor: '#ef4444',
    },
    status: 'UPCOMING',
    startTime: new Date(Date.now() + 120 * 60 * 1000).toISOString(),
    homeScore: 0,
    awayScore: 0,
    venue: 'Camp Nou Complex, Barcelona',
    referee: 'Jesus Gil Manzano',
    predictionConsensus: {
      homeWin: 49,
      draw: 27,
      awayWin: 24,
      totalVotes: 11200,
    },
    oddsDisplay: {
      home: 1.95,
      draw: 3.35,
      away: 3.75,
    },
  },
  {
    id: 'fb-04',
    sport: 'football',
    leagueId: 'seriea',
    leagueName: 'Serie A Enilive',
    leagueCountry: 'Italy',
    homeTeam: {
      id: 'int',
      name: 'Inter Milano',
      shortName: 'INT',
      logo: '🐍',
      sport: 'football',
      country: 'Italy',
      primaryColor: '#1e3a8a',
    },
    awayTeam: {
      id: 'juv',
      name: 'Juventus Zebra',
      shortName: 'JUV',
      logo: '🦓',
      sport: 'football',
      country: 'Italy',
      primaryColor: '#000000',
    },
    status: 'FINISHED',
    startTime: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    homeScore: 3,
    awayScore: 2,
    venue: 'San Siro Stadium, Milan',
    predictionConsensus: {
      homeWin: 48,
      draw: 29,
      awayWin: 23,
      totalVotes: 16400,
    },
    oddsDisplay: {
      home: 2.10,
      draw: 3.20,
      away: 3.40,
    },
  },

  // CRICKET MATCHES
  {
    id: 'ck-01',
    sport: 'cricket',
    leagueId: 'ipl',
    leagueName: 'Indian Premier League (IPL)',
    leagueCountry: 'India',
    homeTeam: {
      id: 'csk',
      name: 'Chennai Super Pride',
      shortName: 'CSK',
      logo: '🦁',
      sport: 'cricket',
      country: 'India',
      primaryColor: '#eab308',
    },
    awayTeam: {
      id: 'mi',
      name: 'Mumbai Titans',
      shortName: 'MI',
      logo: '🌊',
      sport: 'cricket',
      country: 'India',
      primaryColor: '#2563eb',
    },
    status: 'LIVE',
    startTime: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    minute: 16,
    period: '2nd Innings (16.2 Overs)',
    homeScore: 194, // CSK batted first 194/4
    awayScore: 172, // MI currently 172/5
    homeSubScore: '194/4 (20 ov)',
    awaySubScore: '172/5 (16.2 ov)',
    venue: 'MA Chidambaram Stadium, Chennai',
    predictionConsensus: {
      homeWin: 52,
      awayWin: 48,
      totalVotes: 28900,
    },
    oddsDisplay: {
      home: 1.88,
      away: 1.95,
    },
    stats: {
      overs: ['20.0', '16.2'],
      runRate: [9.7, 10.53],
      extras: [8, 11],
    },
    events: [
      { id: 'ck-ev-1', minute: 15, type: 'wicket', teamId: 'mi', player: 'Rohit Sharma (c)', detail: 'c Dhoni b Jadeja (68 off 39)' },
      { id: 'ck-ev-2', minute: 16, type: 'six', teamId: 'mi', player: 'Hardik Pandya', detail: 'Smashed over deep mid-wicket for 94m' },
    ],
  },
  {
    id: 'ck-02',
    sport: 'cricket',
    leagueId: 't20wc',
    leagueName: 'ICC T20 Championship',
    leagueCountry: 'International',
    homeTeam: {
      id: 'ind',
      name: 'India Champions',
      shortName: 'IND',
      logo: '🇮🇳',
      sport: 'cricket',
      country: 'India',
      primaryColor: '#3b82f6',
    },
    awayTeam: {
      id: 'aus',
      name: 'Australia Gold',
      shortName: 'AUS',
      logo: '🇦🇺',
      sport: 'cricket',
      country: 'Australia',
      primaryColor: '#eab308',
    },
    status: 'UPCOMING',
    startTime: new Date(Date.now() + 240 * 60 * 1000).toISOString(),
    homeScore: 0,
    awayScore: 0,
    venue: 'Melbourne Cricket Ground, Melbourne',
    predictionConsensus: {
      homeWin: 55,
      awayWin: 45,
      totalVotes: 35100,
    },
    oddsDisplay: {
      home: 1.80,
      away: 2.05,
    },
  },

  // BASKETBALL MATCHES
  {
    id: 'bb-01',
    sport: 'basketball',
    leagueId: 'nba',
    leagueName: 'NBA Championship',
    leagueCountry: 'USA',
    homeTeam: {
      id: 'lal',
      name: 'Los Angeles Gold',
      shortName: 'LAL',
      logo: '👑',
      sport: 'basketball',
      country: 'USA',
      primaryColor: '#8b5cf6',
    },
    awayTeam: {
      id: 'bos',
      name: 'Boston Shamrock',
      shortName: 'BOS',
      logo: '☘️',
      sport: 'basketball',
      country: 'USA',
      primaryColor: '#10b981',
    },
    status: 'LIVE',
    startTime: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    minute: 9,
    period: 'Q3 (3:45 remaining)',
    homeScore: 88,
    awayScore: 92,
    venue: 'Crypto Center, Los Angeles',
    predictionConsensus: {
      homeWin: 47,
      awayWin: 53,
      totalVotes: 18450,
    },
    oddsDisplay: {
      home: 2.02,
      away: 1.78,
    },
    stats: {
      rebounds: [38, 42],
      assists: [22, 26],
      threePointers: [12, 16],
      freeThrows: [16, 18],
    },
    events: [
      { id: 'bb-ev-1', minute: 8, type: 'three_pointer', teamId: 'bos', player: 'Jayson Tatum', detail: 'Step-back 28ft three pointer' },
      { id: 'bb-ev-2', minute: 9, type: 'dunk', teamId: 'lal', player: 'Anthony Davis', detail: 'Alley-oop reverse slam' },
    ],
  },
  {
    id: 'bb-02',
    sport: 'basketball',
    leagueId: 'nba',
    leagueName: 'NBA Championship',
    leagueCountry: 'USA',
    homeTeam: {
      id: 'gsw',
      name: 'Golden Bay Warriors',
      shortName: 'GSW',
      logo: '🌉',
      sport: 'basketball',
      country: 'USA',
      primaryColor: '#3b82f6',
    },
    awayTeam: {
      id: 'den',
      name: 'Denver Highlands',
      shortName: 'DEN',
      logo: '⛏️',
      sport: 'basketball',
      country: 'USA',
      primaryColor: '#f59e0b',
    },
    status: 'UPCOMING',
    startTime: new Date(Date.now() + 180 * 60 * 1000).toISOString(),
    homeScore: 0,
    awayScore: 0,
    venue: 'Chase Center, San Francisco',
    predictionConsensus: {
      homeWin: 51,
      awayWin: 49,
      totalVotes: 12400,
    },
    oddsDisplay: {
      home: 1.90,
      away: 1.92,
    },
  },

  // TENNIS MATCHES
  {
    id: 'tn-01',
    sport: 'tennis',
    leagueId: 'atp-wimbledon',
    leagueName: 'Grand Slam Major - London',
    leagueCountry: 'UK',
    homeTeam: {
      id: 'alc',
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
      logo: '🎾',
      sport: 'tennis',
      country: 'Spain',
      primaryColor: '#eab308',
    },
    awayTeam: {
      id: 'sin',
      name: 'Jannik Sinner',
      shortName: 'SIN',
      logo: '🎾',
      sport: 'tennis',
      country: 'Italy',
      primaryColor: '#f97316',
    },
    status: 'LIVE',
    startTime: new Date(Date.now() - 110 * 60 * 1000).toISOString(),
    period: 'Set 3 (Game 5 - 40:30)',
    homeScore: 1, // Sets: 1-1
    awayScore: 1,
    homeSubScore: '7-6, 4-6, 3-2*',
    awaySubScore: '6-7, 6-4, 2-3',
    venue: 'Center Court, London',
    predictionConsensus: {
      homeWin: 53,
      awayWin: 47,
      totalVotes: 15320,
    },
    oddsDisplay: {
      home: 1.85,
      away: 1.95,
    },
    stats: {
      aces: [12, 14],
      doubleFaults: [2, 3],
      firstServePercentage: [68, 71],
      breakPointsConverted: ['2/5', '2/6'],
    },
    events: [
      { id: 'tn-ev-1', minute: 90, type: 'ace', teamId: 'alc', player: 'Carlos Alcaraz', detail: '132 mph serve out wide' },
      { id: 'tn-ev-2', minute: 104, type: 'break_point', teamId: 'sin', player: 'Jannik Sinner', detail: 'Backhand crosscourt pass' },
    ],
  },
  {
    id: 'tn-02',
    sport: 'tennis',
    leagueId: 'atp-usopen',
    leagueName: 'US Open Grand Slam',
    leagueCountry: 'USA',
    homeTeam: {
      id: 'djo',
      name: 'Novak Djokovic',
      shortName: 'DJO',
      logo: '🎾',
      sport: 'tennis',
      country: 'Serbia',
      primaryColor: '#3b82f6',
    },
    awayTeam: {
      id: 'med',
      name: 'Daniil Medvedev',
      shortName: 'MED',
      logo: '🎾',
      sport: 'tennis',
      country: 'Monaco',
      primaryColor: '#06b6d4',
    },
    status: 'UPCOMING',
    startTime: new Date(Date.now() + 300 * 60 * 1000).toISOString(),
    homeScore: 0,
    awayScore: 0,
    venue: 'Arthur Ashe Stadium, New York',
    predictionConsensus: {
      homeWin: 58,
      awayWin: 42,
      totalVotes: 19800,
    },
    oddsDisplay: {
      home: 1.68,
      away: 2.25,
    },
  },
];

export const INITIAL_LEAGUES: League[] = [
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    sport: 'football',
    country: 'Europe',
    icon: '🏆',
    standings: [
      { rank: 1, team: 'Madrid Royals', played: 8, won: 7, drawn: 1, lost: 0, points: 22, goalDiff: 14 },
      { rank: 2, team: 'Manchester Sky', played: 8, won: 6, drawn: 2, lost: 0, points: 20, goalDiff: 16 },
      { rank: 3, team: 'Bayern Munich', played: 8, won: 6, drawn: 1, lost: 1, points: 19, goalDiff: 12 },
      { rank: 4, team: 'North London Cannon', played: 8, won: 5, drawn: 2, lost: 1, points: 17, goalDiff: 9 },
      { rank: 5, team: 'Inter Milano', played: 8, won: 5, drawn: 1, lost: 2, points: 16, goalDiff: 7 },
    ],
  },
  {
    id: 'epl',
    name: 'Premier League',
    sport: 'football',
    country: 'England',
    icon: '🦁',
    standings: [
      { rank: 1, team: 'North London Cannon', played: 28, won: 20, drawn: 4, lost: 4, points: 64, goalDiff: 38 },
      { rank: 2, team: 'Manchester Sky', played: 28, won: 19, drawn: 6, lost: 3, points: 63, goalDiff: 35 },
      { rank: 3, team: 'Liverpool Reds', played: 28, won: 18, drawn: 6, lost: 4, points: 60, goalDiff: 31 },
      { rank: 4, team: 'Chelsea Blues', played: 28, won: 15, drawn: 5, lost: 8, points: 50, goalDiff: 14 },
      { rank: 5, team: 'Aston Lions', played: 28, won: 14, drawn: 6, lost: 8, points: 48, goalDiff: 12 },
    ],
  },
  {
    id: 'laliga',
    name: 'La Liga EA Sports',
    sport: 'football',
    country: 'Spain',
    icon: '⚽',
    standings: [
      { rank: 1, team: 'Madrid Royals', played: 27, won: 21, drawn: 4, lost: 2, points: 67, goalDiff: 40 },
      { rank: 2, team: 'Catalonia FC', played: 27, won: 19, drawn: 5, lost: 3, points: 62, goalDiff: 33 },
      { rank: 3, team: 'Atletico Red-White', played: 27, won: 17, drawn: 5, lost: 5, points: 56, goalDiff: 24 },
      { rank: 4, team: 'Athletic Bilbao', played: 27, won: 15, drawn: 6, lost: 6, points: 51, goalDiff: 18 },
    ],
  },
  {
    id: 'ipl',
    name: 'Indian Premier League (IPL)',
    sport: 'cricket',
    country: 'India',
    icon: '🏏',
    standings: [
      { rank: 1, team: 'Chennai Super Pride', played: 10, won: 8, drawn: 0, lost: 2, points: 16, goalDiff: 0.88 },
      { rank: 2, team: 'Kolkata Knights', played: 10, won: 7, drawn: 0, lost: 3, points: 14, goalDiff: 0.72 },
      { rank: 3, team: 'Mumbai Titans', played: 10, won: 6, drawn: 0, lost: 4, points: 12, goalDiff: 0.45 },
      { rank: 4, team: 'Royal Bangalore', played: 10, won: 5, drawn: 0, lost: 5, points: 10, goalDiff: 0.12 },
    ],
  },
  {
    id: 'nba',
    name: 'NBA Eastern & Western',
    sport: 'basketball',
    country: 'USA',
    icon: '🏀',
    standings: [
      { rank: 1, team: 'Boston Shamrock', played: 65, won: 52, drawn: 0, lost: 13, points: 104, goalDiff: 11.2 },
      { rank: 2, team: 'Denver Highlands', played: 65, won: 47, drawn: 0, lost: 18, points: 94, goalDiff: 8.4 },
      { rank: 3, team: 'Los Angeles Gold', played: 65, won: 42, drawn: 0, lost: 23, points: 84, goalDiff: 5.1 },
      { rank: 4, team: 'Golden Bay Warriors', played: 65, won: 39, drawn: 0, lost: 26, points: 78, goalDiff: 3.2 },
    ],
  },
  {
    id: 'atp-wimbledon',
    name: 'ATP World Tour',
    sport: 'tennis',
    country: 'Global',
    icon: '🎾',
    standings: [
      { rank: 1, team: 'Jannik Sinner', played: 52, won: 46, drawn: 0, lost: 6, points: 11830, goalDiff: 88 },
      { rank: 2, team: 'Carlos Alcaraz', played: 50, won: 43, drawn: 0, lost: 7, points: 8900, goalDiff: 84 },
      { rank: 3, team: 'Alexander Zverev', played: 54, won: 42, drawn: 0, lost: 12, points: 7915, goalDiff: 77 },
      { rank: 4, team: 'Novak Djokovic', played: 38, won: 32, drawn: 0, lost: 6, points: 6500, goalDiff: 82 },
    ],
  },
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    id: 'usr-1',
    rank: 1,
    username: 'ApexTactician',
    avatarSeed: 'apex',
    badge: 'Master',
    fanPoints: 18450,
    accuracy: 86.4,
    streak: 9,
    totalPredictions: 142,
  },
  {
    id: 'usr-2',
    rank: 2,
    username: 'GoldenStriker',
    avatarSeed: 'striker',
    badge: 'Master',
    fanPoints: 16920,
    accuracy: 82.1,
    streak: 7,
    totalPredictions: 135,
  },
  {
    id: 'usr-3',
    rank: 3,
    username: 'StatWhiz24',
    avatarSeed: 'stat',
    badge: 'Diamond',
    fanPoints: 15300,
    accuracy: 79.5,
    streak: 4,
    totalPredictions: 118,
  },
  {
    id: 'usr-me',
    rank: 4,
    username: 'CR7MasterMind (You)',
    avatarSeed: 'champion',
    badge: 'Diamond',
    fanPoints: 14200,
    accuracy: 77.8,
    streak: 5,
    totalPredictions: 90,
    isCurrentUser: true,
  },
  {
    id: 'usr-5',
    rank: 5,
    username: 'PitchVisionary',
    avatarSeed: 'pitch',
    badge: 'Diamond',
    fanPoints: 13880,
    accuracy: 75.0,
    streak: 2,
    totalPredictions: 104,
  },
  {
    id: 'usr-6',
    rank: 6,
    username: 'CenturyKing',
    avatarSeed: 'century',
    badge: 'Gold',
    fanPoints: 11950,
    accuracy: 71.4,
    streak: 3,
    totalPredictions: 84,
  },
  {
    id: 'usr-7',
    rank: 7,
    username: 'CourtGeneral',
    avatarSeed: 'court',
    badge: 'Gold',
    fanPoints: 10400,
    accuracy: 69.2,
    streak: 1,
    totalPredictions: 78,
  },
  {
    id: 'usr-8',
    rank: 8,
    username: 'NetDominator',
    avatarSeed: 'net',
    badge: 'Silver',
    fanPoints: 9150,
    accuracy: 66.7,
    streak: 0,
    totalPredictions: 66,
  },
];

class SportsDataService {
  private matches: Match[] = [...INITIAL_MATCHES];
  private isSimulating: boolean = true;

  constructor() {
    // Start subtle background ticker simulation
    if (typeof window !== 'undefined') {
      window.setInterval(() => {
        if (this.isSimulating) {
          this.advanceLiveMatches();
        }
      }, 7000);
    }
  }

  public setSimulation(active: boolean) {
    this.isSimulating = active;
  }

  public getIsSimulating(): boolean {
    return this.isSimulating;
  }

  public async getMatches(sport?: SportType, status?: string): Promise<Match[]> {
    // Artificial network latency simulation for smooth state transitions
    await new Promise((res) => setTimeout(res, 80));
    let result = [...this.matches];
    if (sport) {
      result = result.filter((m) => m.sport === sport);
    }
    if (status && status !== 'ALL') {
      result = result.filter((m) => m.status === status);
    }
    return result;
  }

  public async getMatchById(id: string): Promise<Match | undefined> {
    await new Promise((res) => setTimeout(res, 50));
    return this.matches.find((m) => m.id === id);
  }

  public async getFeaturedMatch(): Promise<Match> {
    // Return high profile live or upcoming match
    const live = this.matches.find((m) => m.id === 'fb-01');
    return live || this.matches[0];
  }

  public async getLeagues(sport?: SportType): Promise<League[]> {
    await new Promise((res) => setTimeout(res, 60));
    if (sport) {
      return INITIAL_LEAGUES.filter((l) => l.sport === sport);
    }
    return INITIAL_LEAGUES;
  }

  public async getLeaderboard(): Promise<LeaderboardUser[]> {
    await new Promise((res) => setTimeout(res, 60));
    return INITIAL_LEADERBOARD;
  }

  public search(query: string): { matches: Match[]; leagues: League[] } {
    const q = query.trim().toLowerCase();
    if (!q) return { matches: [], leagues: [] };

    const matches = this.matches.filter(
      (m) =>
        m.homeTeam.name.toLowerCase().includes(q) ||
        m.awayTeam.name.toLowerCase().includes(q) ||
        m.homeTeam.shortName.toLowerCase().includes(q) ||
        m.awayTeam.shortName.toLowerCase().includes(q) ||
        m.leagueName.toLowerCase().includes(q) ||
        m.sport.toLowerCase().includes(q)
    );

    const leagues = INITIAL_LEAGUES.filter(
      (l) => l.name.toLowerCase().includes(q) || l.country.toLowerCase().includes(q)
    );

    return { matches, leagues };
  }

  // Live match advancement logic
  private advanceLiveMatches() {
    this.matches = this.matches.map((match) => {
      if (match.status !== 'LIVE') return match;

      // Advance minute if football
      if (match.sport === 'football' && match.minute !== undefined) {
        const nextMin = match.minute + 1;
        if (nextMin > 90) {
          return {
            ...match,
            minute: 90,
            status: 'FINISHED',
            period: 'Full Time',
          };
        }

        // Random subtle event trigger
        let updatedEvents = match.events ? [...match.events] : [];
        let updatedHomeScore = match.homeScore;
        let updatedAwayScore = match.awayScore;

        if (Math.random() < 0.08) {
          const scoringHome = Math.random() > 0.5;
          if (scoringHome) {
            updatedHomeScore += 1;
            updatedEvents.push({
              id: `sim-ev-${Date.now()}`,
              minute: nextMin,
              type: 'goal',
              teamId: match.homeTeam.id,
              player: `${match.homeTeam.shortName} Attacker`,
              detail: 'Fast break goal on the counter',
            });
          } else {
            updatedAwayScore += 1;
            updatedEvents.push({
              id: `sim-ev-${Date.now()}`,
              minute: nextMin,
              type: 'goal',
              teamId: match.awayTeam.id,
              player: `${match.awayTeam.shortName} Striker`,
              detail: 'Clinical finish into bottom corner',
            });
          }
        }

        return {
          ...match,
          minute: nextMin,
          homeScore: updatedHomeScore,
          awayScore: updatedAwayScore,
          events: updatedEvents,
        };
      }

      // Basketball score drift
      if (match.sport === 'basketball') {
        const addHome = Math.random() > 0.6 ? 2 : 0;
        const addAway = Math.random() > 0.6 ? 3 : 0;
        return {
          ...match,
          homeScore: match.homeScore + addHome,
          awayScore: match.awayScore + addAway,
        };
      }

      return match;
    });
  }

  public manualRefreshFeed(): void {
    this.advanceLiveMatches();
  }
}

export const sportsDataService = new SportsDataService();
