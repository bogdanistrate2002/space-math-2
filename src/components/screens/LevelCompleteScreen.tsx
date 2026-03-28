import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Rocket from '../ui/Rocket';
import { LEVELS } from '../../constants/levels';
import { randomMessage, LEVEL_COMPLETE_MESSAGES } from '../../constants/messages';
import type { AudioManager } from '../../types/audio';
import type { UseConfettiReturn } from '../../hooks/useConfetti';

interface LevelCompleteScreenProps {
  levelIndex: number;
  score: number;
  lives: number;
  audio: AudioManager;
  confetti: UseConfettiReturn;
  onContinue: () => void;  // continuă la nivelul următor
  onHome: () => void;
}

export default function LevelCompleteScreen({
  levelIndex,
  score,
  lives,
  audio,
  confetti,
  onContinue,
  onHome,
}: LevelCompleteScreenProps): JSX.Element {
  const completedLevel = LEVELS[levelIndex]!;
  const isLastLevel = levelIndex >= LEVELS.length - 1;

  useEffect(() => {
    audio.playSound('levelup');
    confetti.fireLevelComplete();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
    >
      <Rocket />
      <h2 className="font-orbitron text-4xl font-black text-star-yellow neon-text mt-6 mb-2">
        Nivel Completat!
      </h2>
      <p className="font-nunito text-xl text-white/80 mb-6">
        {randomMessage(LEVEL_COMPLETE_MESSAGES)}
      </p>

      <div className="card-glass p-6 mb-8 w-full max-w-sm">
        <p className="font-orbitron text-cosmic-cyan text-lg mb-1">
          {completedLevel.emoji} {completedLevel.name}
        </p>
        <p className="font-nunito text-white/60 mb-4">nivel finalizat</p>
        <div className="flex justify-around">
          <div>
            <p className="font-orbitron text-star-yellow text-3xl font-bold">{score}</p>
            <p className="font-nunito text-white/50 text-sm">PUNCTE</p>
          </div>
          <div>
            <p className="font-orbitron text-danger-red text-3xl font-bold">
              {'❤️'.repeat(lives)}
            </p>
            <p className="font-nunito text-white/50 text-sm">VIEȚI RĂMASE</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        {!isLastLevel && (
          <button
            onClick={onContinue}
            aria-label="Continuă la nivelul următor"
            className="btn-space flex-1 bg-success-green/20 border-2 border-success-green
                       text-success-green hover:bg-success-green hover:text-space-black
                       focus:ring-success-green"
          >
            Nivelul următor →
          </button>
        )}
        {isLastLevel && (
          <button
            onClick={onContinue}
            aria-label="Mergi la clasament"
            className="btn-space flex-1 bg-star-yellow/20 border-2 border-star-yellow
                       text-star-yellow hover:bg-star-yellow hover:text-space-black
                       focus:ring-star-yellow"
          >
            🏆 Clasament
          </button>
        )}
        <button
          onClick={onHome}
          aria-label="Înapoi la meniu"
          className="btn-space flex-1 bg-white/10 border-2 border-white/30 text-white
                     hover:bg-white/20 focus:ring-white"
        >
          ← Meniu
        </button>
      </div>
    </motion.div>
  );
}
