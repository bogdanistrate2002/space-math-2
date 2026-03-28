import { describe, it, expect } from 'vitest';
import { calculatePoints, FEEDBACK_DELAY_MS } from '../utils/scoreCalculator';

describe('calculatePoints', () => {
  it('returnează 0 pentru răspuns greșit', () => {
    expect(calculatePoints(0, 0, false)).toBe(0);
    expect(calculatePoints(4, 5, false)).toBe(0);
  });

  it('calculează puncte de bază corect per nivel', () => {
    // (levelIndex + 1) * 10
    expect(calculatePoints(0, 0, true)).toBe(10);  // nivel 1: 10 pts
    expect(calculatePoints(1, 0, true)).toBe(20);  // nivel 2: 20 pts
    expect(calculatePoints(4, 0, true)).toBe(50);  // nivel 5: 50 pts
  });

  it('adaugă bonus de 50% la 5+ corecte consecutive', () => {
    // nivel 1 (10 pts bază) + 50% bonus = 15 pts
    expect(calculatePoints(0, 5, true)).toBe(15);
    expect(calculatePoints(0, 10, true)).toBe(15);
    // nivel 4 (40 pts bază) + 50% bonus = 60 pts
    expect(calculatePoints(3, 7, true)).toBe(60);
  });

  it('nu aplică bonus sub 5 corecte consecutive', () => {
    expect(calculatePoints(0, 4, true)).toBe(10);
    expect(calculatePoints(2, 3, true)).toBe(30);
  });
});

describe('FEEDBACK_DELAY_MS', () => {
  it('este 1500 ms', () => {
    expect(FEEDBACK_DELAY_MS).toBe(1500);
  });
});
