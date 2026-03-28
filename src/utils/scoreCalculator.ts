// Delay (ms) între selectarea răspunsului și avansarea la întrebarea următoare
export const FEEDBACK_DELAY_MS = 1500;

/**
 * Calculează punctele pentru un răspuns.
 * @param levelIndex - 0-4 (0 = Cadet, 4 = Maestru Cosmic)
 * @param consecutiveCorrect - numărul de răspunsuri corecte consecutive
 * @param isCorrect - dacă răspunsul e corect
 */
export function calculatePoints(
  levelIndex: number,
  consecutiveCorrect: number,
  isCorrect: boolean,
): number {
  if (!isCorrect) return 0;
  const base = (levelIndex + 1) * 10;
  const bonus = consecutiveCorrect >= 5 ? Math.round(base * 0.5) : 0;
  return base + bonus;
}
