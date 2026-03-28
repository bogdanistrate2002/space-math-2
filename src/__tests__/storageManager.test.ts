import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStorageData,
  saveStorageData,
  updateLeaderboard,
  DEFAULT_STORAGE_DATA,
} from '../utils/storageManager';
import type { LeaderboardEntry } from '../types/storage';

// Curăță localStorage înainte de fiecare test
beforeEach(() => {
  localStorage.clear();
});

describe('getStorageData', () => {
  it('returnează datele implicite când localStorage e gol', () => {
    const data = getStorageData();
    expect(data).toEqual(DEFAULT_STORAGE_DATA);
  });

  it('returnează datele salvate anterior', () => {
    const custom = { ...DEFAULT_STORAGE_DATA, highScore: 250 };
    localStorage.setItem('mm_data', JSON.stringify(custom));
    expect(getStorageData().highScore).toBe(250);
  });

  it('returnează datele implicite dacă JSON e corupt', () => {
    localStorage.setItem('mm_data', 'not-json{{{');
    const data = getStorageData();
    expect(data).toEqual(DEFAULT_STORAGE_DATA);
  });
});

describe('saveStorageData', () => {
  it('persistă datele și le poate citi înapoi', () => {
    const data = { ...DEFAULT_STORAGE_DATA, highScore: 500 };
    saveStorageData(data);
    expect(getStorageData().highScore).toBe(500);
  });
});

describe('updateLeaderboard', () => {
  it('adaugă o nouă intrare', () => {
    const entry: LeaderboardEntry = {
      name: 'Ion',
      score: 300,
      levelReached: 3,
      date: new Date().toISOString(),
    };
    const result = updateLeaderboard([], entry);
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe('Ion');
  });

  it('sortează descrescător după scor', () => {
    const entries: LeaderboardEntry[] = [
      { name: 'A', score: 100, levelReached: 1, date: '' },
      { name: 'B', score: 300, levelReached: 2, date: '' },
      { name: 'C', score: 200, levelReached: 1, date: '' },
    ];
    const newEntry: LeaderboardEntry = {
      name: 'D',
      score: 150,
      levelReached: 1,
      date: '',
    };
    const result = updateLeaderboard(entries, newEntry);
    expect(result[0]!.score).toBe(300);
    expect(result[1]!.score).toBe(200);
    expect(result[2]!.score).toBe(150);
  });

  it('păstrează maxim 10 intrări', () => {
    const entries: LeaderboardEntry[] = Array.from({ length: 10 }, (_, i) => ({
      name: `P${i}`,
      score: (10 - i) * 100,
      levelReached: 1,
      date: '',
    }));
    const newEntry: LeaderboardEntry = {
      name: 'Nou',
      score: 50,
      levelReached: 1,
      date: '',
    };
    const result = updateLeaderboard(entries, newEntry);
    expect(result).toHaveLength(10);
    // Scorul 50 (cel mai mic) nu intră în top 10
    expect(result.find(e => e.name === 'Nou')).toBeUndefined();
  });

  it('înlocuiește cel mai mic scor dacă noul e mai mare', () => {
    const entries: LeaderboardEntry[] = Array.from({ length: 10 }, (_, i) => ({
      name: `P${i}`,
      score: (i + 1) * 10,
      levelReached: 1,
      date: '',
    }));
    const newEntry: LeaderboardEntry = {
      name: 'Campion',
      score: 500,
      levelReached: 5,
      date: '',
    };
    const result = updateLeaderboard(entries, newEntry);
    expect(result).toHaveLength(10);
    expect(result.find(e => e.name === 'Campion')).toBeDefined();
  });
});
