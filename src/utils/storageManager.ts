import type { StorageData, LeaderboardEntry } from '../types/storage';

const STORAGE_KEY = 'mm_data';

// Datele implicite pentru un jucător nou
export const DEFAULT_STORAGE_DATA: StorageData = {
  highScore: 0,
  leaderboard: [],
  unlockedAchievements: [],
  unlockedLevels: [1], // primul nivel mereu deblocat
  sessionCount: 0,
};

// Citește datele din localStorage cu fallback la valorile implicite
export function getStorageData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STORAGE_DATA };
    return { ...DEFAULT_STORAGE_DATA, ...(JSON.parse(raw) as Partial<StorageData>) };
  } catch {
    return { ...DEFAULT_STORAGE_DATA };
  }
}

// Salvează datele în localStorage
export function saveStorageData(data: StorageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Adaugă o intrare nouă în clasament și returnează top 10 sortate descrescător.
 * Nu modifică localStorage direct — apelantul trebuie să salveze rezultatul.
 */
export function updateLeaderboard(
  current: LeaderboardEntry[],
  newEntry: LeaderboardEntry,
): LeaderboardEntry[] {
  const combined = [...current, newEntry];
  const sorted = combined.sort((a, b) => b.score - a.score);
  return sorted.slice(0, 10);
}
