import type { Level } from '../types/game';

export const QUESTIONS_PER_LEVEL = 10;
export const INITIAL_LIVES = 3;

// Cele 5 niveluri de dificultate
export const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Cadet',
    operations: ['+', '-'],
    maxNumber: 10,
    allowNegative: false,
    emoji: '🛸',
    description: 'Adunare și scădere până la 10',
  },
  {
    id: 2,
    name: 'Pilot',
    operations: ['+', '-'],
    maxNumber: 20,
    allowNegative: false,
    emoji: '🚀',
    description: 'Adunare și scădere până la 20',
  },
  {
    id: 3,
    name: 'Comandant',
    operations: ['+', '-', '*'],
    maxNumber: 20,
    allowNegative: true,
    emoji: '👨‍✈️',
    description: 'Adunare, scădere și înmulțire până la 20',
  },
  {
    id: 4,
    name: 'Explorator',
    operations: ['+', '-', '*', '/'],
    maxNumber: 50,
    allowNegative: true,
    emoji: '🌌',
    description: 'Toate operațiile până la 50',
  },
  {
    id: 5,
    name: 'Maestru Cosmic',
    operations: ['+', '-', '*', '/'],
    maxNumber: 100,
    allowNegative: true,
    emoji: '⭐',
    description: 'Toate operațiile mixate până la 100',
  },
];
