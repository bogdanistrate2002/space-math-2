import { useState, useCallback } from 'react';
import type { AchievementId } from '../types/storage';
import type { GameState } from '../types/game';
import {
  checkNewAchievements,
  checkExplorerAchievement,
} from '../utils/achievementChecker';
import { getStorageData, saveStorageData } from '../utils/storageManager';

export interface UseAchievementsReturn {
  unlockedAchievements: AchievementId[];
  pendingToast: AchievementId | null;
  checkAndUnlock: (state: GameState) => void;
  dismissToast: () => void;
}

export function useAchievements(): UseAchievementsReturn {
  const [unlockedAchievements, setUnlocked] = useState<AchievementId[]>(
    () => getStorageData().unlockedAchievements,
  );
  const [pendingToast, setPendingToast] = useState<AchievementId | null>(null);

  // Verifică și salvează achievement-urile noi la finalul unui nivel
  const checkAndUnlock = useCallback((state: GameState) => {
    const data = getStorageData();

    // Incrementează sesiunile și deblochează nivelul următor
    const newSessionCount = data.sessionCount + 1;
    const newUnlockedLevels = Array.from(
      new Set([...data.unlockedLevels, state.levelIndex + 1, state.levelIndex + 2]),
    ).filter((l) => l <= 5);

    const newAchievements = checkNewAchievements(
      state,
      data.unlockedAchievements,
      newSessionCount,
    );

    // Verifică achievement-ul explorer separat
    if (checkExplorerAchievement(newUnlockedLevels, [
      ...data.unlockedAchievements,
      ...newAchievements,
    ])) {
      newAchievements.push('explorer');
    }

    const allUnlocked: AchievementId[] = [
      ...data.unlockedAchievements,
      ...newAchievements,
    ];

    saveStorageData({
      ...data,
      sessionCount: newSessionCount,
      unlockedAchievements: allUnlocked,
      unlockedLevels: newUnlockedLevels,
      highScore: Math.max(data.highScore, state.score),
    });

    setUnlocked(allUnlocked);

    // Afișează primul achievement nou ca toast
    if (newAchievements.length > 0) {
      setPendingToast(newAchievements[0] ?? null);
    }
  }, []);

  const dismissToast = useCallback(() => setPendingToast(null), []);

  return { unlockedAchievements, pendingToast, checkAndUnlock, dismissToast };
}
