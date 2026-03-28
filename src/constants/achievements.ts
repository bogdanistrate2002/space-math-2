import type { AchievementDefinition } from '../types/storage';

// Cele 8 achievements ale jocului
export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first_win',
    name: 'Prima Victorie',
    description: 'Completează primul nivel',
    emoji: '🏆',
  },
  {
    id: 'no_mistakes',
    name: 'Perfecțiune',
    description: 'Completează un nivel fără greșeli',
    emoji: '💎',
  },
  {
    id: 'speed_demon',
    name: 'Creier de Foc',
    description: '5 răspunsuri corecte consecutive',
    emoji: '🔥',
  },
  {
    id: 'veteran',
    name: 'Veteran Cosmic',
    description: 'Joacă 10 sesiuni',
    emoji: '🎖️',
  },
  {
    id: 'master',
    name: 'Maestru',
    description: 'Completează nivelul 5',
    emoji: '👑',
  },
  {
    id: 'explorer',
    name: 'Explorator',
    description: 'Deblochează toate nivelurile',
    emoji: '🗺️',
  },
  {
    id: 'sharp_mind',
    name: 'Minte Ascuțită',
    description: 'Obține un scor mai mare de 500',
    emoji: '🧠',
  },
  {
    id: 'comeback',
    name: 'Revenire Epică',
    description: 'Câștigă cu o singură viață rămasă',
    emoji: '💪',
  },
];
