import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export interface UseConfettiReturn {
  fireConfetti: () => void;
  fireLevelComplete: () => void;
}

// Wrapper pentru canvas-confetti cu efecte specifice jocului
export function useConfetti(): UseConfettiReturn {
  // Confetti pentru răspuns corect — burst mic
  const fireConfetti = useCallback(() => {
    void confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff6b35', '#00d4ff', '#39ff14', '#6c3fc5'],
    });
  }, []);

  // Confetti pentru nivel completat — două salve laterale
  const fireLevelComplete = useCallback(() => {
    const fire = (angle: number, origin: { x: number; y: number }): void => {
      void confetti({
        particleCount: 80,
        angle,
        spread: 55,
        origin,
        colors: ['#ffd700', '#ff6b35', '#00d4ff', '#39ff14'],
      });
    };
    fire(60, { x: 0, y: 0.65 });
    setTimeout(() => fire(120, { x: 1, y: 0.65 }), 200);
  }, []);

  return { fireConfetti, fireLevelComplete };
}
