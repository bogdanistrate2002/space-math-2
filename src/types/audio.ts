// Tipurile de sunete din joc
export type SoundType = 'correct' | 'wrong' | 'levelup' | 'gameover' | 'background';

// Interfața hook-ului de audio expus componentelor
export interface AudioManager {
  playSound: (type: SoundType) => void;
  startBackground: () => void;
  stopBackground: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}
