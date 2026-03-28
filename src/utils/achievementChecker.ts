import type { GameState } from '../types/game';
import type { AchievementId } from '../types/storage';

/**
 * Returnează lista de achievement-uri nou deblocate la finalul unui nivel.
 * Se apelează DOAR când phase === 'levelComplete'.
 *
 * @param state - starea jocului la finalul nivelului
 * @param existing - achievement-uri deja deblocate
 * @param sessionCount - numărul total de sesiuni (după incrementare)
 */
export function checkNewAchievements(
  state: GameState,
  existing: AchievementId[],
  sessionCount: number,
): AchievementId[] {
  const unlocked = new Set(existing);
  const newOnes: AchievementId[] = [];

  function tryUnlock(id: AchievementId, condition: boolean): void {
    if (condition && !unlocked.has(id)) {
      newOnes.push(id);
    }
  }

  // Primul nivel completat (orice nivel)
  tryUnlock('first_win', true);

  // Nivel completat fără greșeli (3 vieți rămase = INITIAL_LIVES)
  tryUnlock('no_mistakes', state.lives === 3);

  // 5+ răspunsuri corecte consecutive în sesiunea curentă
  tryUnlock('speed_demon', state.consecutiveCorrect >= 5);

  // 10+ sesiuni de joc
  tryUnlock('veteran', sessionCount >= 10);

  // Nivelul 5 (Maestru Cosmic) completat — levelIndex 4 = nivel 5
  tryUnlock('master', state.levelIndex === 4);

  // Scor mai mare de 500
  tryUnlock('sharp_mind', state.score > 500);

  // Câștigat cu 1 singură viață
  tryUnlock('comeback', state.lives === 1);

  return newOnes;
}

/**
 * Verifică achievement-ul 'explorer' — toate nivelurile deblocate.
 * Se apelează separat, după actualizarea unlockedLevels în storage.
 */
export function checkExplorerAchievement(
  unlockedLevels: number[],
  existing: AchievementId[],
): boolean {
  return unlockedLevels.length >= 5 && !existing.includes('explorer');
}
