import { useState, useCallback } from 'react';
import type { LeaderboardEntry } from '../types/storage';
import { getStorageData, saveStorageData, updateLeaderboard } from '../utils/storageManager';

export interface UseLeaderboardReturn {
  entries: LeaderboardEntry[];
  addEntry: (name: string, score: number, levelReached: number) => void;
  refresh: () => void;
}

export function useLeaderboard(): UseLeaderboardReturn {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(
    () => getStorageData().leaderboard,
  );

  const addEntry = useCallback((name: string, score: number, levelReached: number) => {
    const newEntry: LeaderboardEntry = {
      name: name.trim().slice(0, 12),
      score,
      levelReached,
      date: new Date().toISOString(),
    };
    const data = getStorageData();
    const updated = updateLeaderboard(data.leaderboard, newEntry);
    const newData = {
      ...data,
      leaderboard: updated,
      highScore: Math.max(data.highScore, score),
    };
    saveStorageData(newData);
    setEntries(updated);
  }, []);

  const refresh = useCallback(() => {
    setEntries(getStorageData().leaderboard);
  }, []);

  return { entries, addEntry, refresh };
}
