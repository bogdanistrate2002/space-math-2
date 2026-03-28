// ID-urile celor 8 achievements
export type AchievementId =
  | 'first_win'
  | 'no_mistakes'
  | 'speed_demon'
  | 'veteran'
  | 'master'
  | 'explorer'
  | 'sharp_mind'
  | 'comeback';

// O intrare în clasament
export interface LeaderboardEntry {
  name: string;      // max 12 caractere
  score: number;
  levelReached: number; // 1-5
  date: string;        // ISO string
}

// Datele persistate în localStorage
export interface StorageData {
  highScore: number;
  leaderboard: LeaderboardEntry[]; // max 10 intrări, sortate descrescător
  unlockedAchievements: AchievementId[];
  unlockedLevels: number[];        // IDs niveluri deblocate (1-5)
  sessionCount: number;            // număr total de sesiuni de joc
}

// Definiția unui achievement (pentru UI)
export interface AchievementDefinition {
  id: AchievementId;
  name: string;       // denumire în română
  description: string; // condiție în română
  emoji: string;
}
