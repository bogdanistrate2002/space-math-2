import { describe, it, expect } from 'vitest';
import { checkNewAchievements } from '../utils/achievementChecker';
import type { GameState } from '../types/game';
import type { AchievementId } from '../types/storage';

// Stare de joc minimală pentru teste
function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    phase: 'levelComplete',
    levelIndex: 0,
    questionIndex: 9,
    lives: 3,
    score: 100,
    consecutiveCorrect: 0,
    question: null,
    selectedAnswer: null,
    answerFeedback: null,
    highScore: 0,
    ...overrides,
  };
}

describe('checkNewAchievements', () => {
  it('returnează first_win la primul nivel completat', () => {
    const result = checkNewAchievements(makeState(), [], 1);
    expect(result).toContain('first_win');
  });

  it('nu returnează first_win dacă deja deblocat', () => {
    const result = checkNewAchievements(makeState(), ['first_win'], 1);
    expect(result).not.toContain('first_win');
  });

  it('returnează no_mistakes cu 3 vieți la finalul nivelului', () => {
    const result = checkNewAchievements(makeState({ lives: 3 }), [], 1);
    expect(result).toContain('no_mistakes');
  });

  it('nu returnează no_mistakes cu vieți lipsă', () => {
    const result = checkNewAchievements(makeState({ lives: 2 }), [], 1);
    expect(result).not.toContain('no_mistakes');
  });

  it('returnează speed_demon la 5+ corecte consecutive', () => {
    const result = checkNewAchievements(
      makeState({ consecutiveCorrect: 5 }),
      [],
      1,
    );
    expect(result).toContain('speed_demon');
  });

  it('nu returnează speed_demon sub 5 consecutive', () => {
    const result = checkNewAchievements(
      makeState({ consecutiveCorrect: 4 }),
      [],
      1,
    );
    expect(result).not.toContain('speed_demon');
  });

  it('returnează veteran la 10+ sesiuni', () => {
    const result = checkNewAchievements(makeState(), [], 10);
    expect(result).toContain('veteran');
  });

  it('returnează master la nivelul 5 completat', () => {
    const result = checkNewAchievements(makeState({ levelIndex: 4 }), [], 1);
    expect(result).toContain('master');
  });

  it('returnează sharp_mind la scor > 500', () => {
    const result = checkNewAchievements(makeState({ score: 501 }), [], 1);
    expect(result).toContain('sharp_mind');
  });

  it('nu returnează sharp_mind la scor = 500', () => {
    const result = checkNewAchievements(makeState({ score: 500 }), [], 1);
    expect(result).not.toContain('sharp_mind');
  });

  it('returnează comeback cu 1 viață și nivel completat', () => {
    const result = checkNewAchievements(makeState({ lives: 1 }), [], 1);
    expect(result).toContain('comeback');
  });

  it('returnează mai multe achievements simultan', () => {
    const result = checkNewAchievements(
      makeState({ lives: 3, consecutiveCorrect: 5, score: 600 }),
      [],
      1,
    );
    const ids = result as AchievementId[];
    expect(ids).toContain('first_win');
    expect(ids).toContain('no_mistakes');
    expect(ids).toContain('speed_demon');
    expect(ids).toContain('sharp_mind');
  });
});
