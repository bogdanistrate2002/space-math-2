import { describe, it, expect } from 'vitest';
import {
  generateQuestion,
  generateOptions,
  shuffle,
} from '../utils/questionGenerator';
import { LEVELS } from '../constants/levels';

describe('shuffle', () => {
  it('returnează același număr de elemente', () => {
    const arr = [1, 2, 3, 4];
    expect(shuffle([...arr])).toHaveLength(4);
  });

  it('conține toate elementele originale', () => {
    const arr = [1, 2, 3, 4];
    expect(shuffle([...arr]).sort()).toEqual([1, 2, 3, 4]);
  });
});

describe('generateOptions', () => {
  it('returnează exact 4 variante', () => {
    expect(generateOptions(10, 100)).toHaveLength(4);
  });

  it('include răspunsul corect', () => {
    const correct = 15;
    expect(generateOptions(correct, 100)).toContain(correct);
  });

  it('nu are duplicate', () => {
    const opts = generateOptions(20, 100);
    expect(new Set(opts).size).toBe(4);
  });

  it('variantele greșite sunt pozitive', () => {
    const opts = generateOptions(5, 10);
    opts.forEach(opt => expect(opt).toBeGreaterThan(0));
  });
});

describe('generateQuestion — nivel Cadet (1)', () => {
  const level = LEVELS[0]!;

  it('returnează o întrebare validă cu 4 opțiuni', () => {
    const q = generateQuestion(level);
    expect(q.options).toHaveLength(4);
    expect(q.options).toContain(q.correctAnswer);
    expect(q.id).toBeTruthy();
  });

  it('operanzii sunt între 1 și 10', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion(level);
      expect(q.operand1).toBeGreaterThanOrEqual(1);
      expect(q.operand1).toBeLessThanOrEqual(10);
      expect(q.operand2).toBeGreaterThanOrEqual(1);
      expect(q.operand2).toBeLessThanOrEqual(10);
    }
  });

  it('operațiile sunt doar + și -', () => {
    for (let i = 0; i < 50; i++) {
      const q = generateQuestion(level);
      expect(['+', '-']).toContain(q.operation);
    }
  });

  it('rezultatul nu este negativ (nivel fără negative)', () => {
    for (let i = 0; i < 100; i++) {
      const q = generateQuestion(level);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
    }
  });
});

describe('generateQuestion — nivel cu împărțire (4)', () => {
  const level = LEVELS[3]!;

  it('împărțirea dă întotdeauna rezultat întreg pozitiv', () => {
    for (let i = 0; i < 100; i++) {
      const q = generateQuestion(level);
      if (q.operation === '/') {
        expect(q.correctAnswer).toBe(Math.floor(q.correctAnswer));
        expect(q.correctAnswer).toBeGreaterThan(0);
        expect(q.operand1 % q.operand2).toBe(0);
      }
    }
  });
});

describe('generateQuestion — nivel Maestru (5)', () => {
  const level = LEVELS[4]!;

  it('folosește toate cele 4 operații (distribuție)', () => {
    const ops = new Set<string>();
    for (let i = 0; i < 200; i++) {
      ops.add(generateQuestion(level).operation);
    }
    expect(ops.has('+')).toBe(true);
    expect(ops.has('-')).toBe(true);
    expect(ops.has('*')).toBe(true);
    expect(ops.has('/')).toBe(true);
  });
});
