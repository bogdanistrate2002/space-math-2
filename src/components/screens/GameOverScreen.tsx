import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AudioManager } from '../../types/audio';
import type { UseLeaderboardReturn } from '../../hooks/useLeaderboard';

interface GameOverScreenProps {
  score: number;
  levelReached: number;
  audio: AudioManager;
  leaderboard: UseLeaderboardReturn;
  onHome: () => void;
  onRestart: (levelIndex: number) => void;
  levelIndex: number;
}

// Ecranul game over cu input pentru salvare scor
export default function GameOverScreen({
  score,
  levelReached,
  audio,
  leaderboard,
  onHome,
  onRestart,
  levelIndex,
}: GameOverScreenProps): JSX.Element {
  const [playerName, setPlayerName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    audio.playSound('gameover');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = (): void => {
    const name = playerName.trim();
    if (!name) return;
    leaderboard.addEntry(name, score, levelReached);
    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
    >
      <span className="text-8xl mb-4" aria-hidden="true">💥</span>
      <h2 className="font-orbitron text-4xl font-black text-danger-red neon-text mb-2">
        Joc Terminat
      </h2>
      <p className="font-nunito text-white/70 text-lg mb-6">Ai epuizat toate viețile!</p>

      <div className="card-glass p-6 mb-6 w-full max-w-sm">
        <p className="font-orbitron text-star-yellow text-5xl font-black">{score}</p>
        <p className="font-nunito text-white/50 mt-1">puncte acumulate</p>
        <p className="font-nunito text-white/40 text-sm mt-2">
          Nivel atins: {levelReached}
        </p>
      </div>

      {/* Salvare scor */}
      {!saved ? (
        <div className="w-full max-w-sm mb-6">
          <label htmlFor="player-name" className="font-nunito text-white/70 text-sm block mb-2">
            Introdu numele tău (max 12 caractere):
          </label>
          <div className="flex gap-2">
            <input
              id="player-name"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value.slice(0, 12))}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              maxLength={12}
              placeholder="Numele tău..."
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2
                         text-white font-nunito focus:outline-none focus:border-cosmic-cyan
                         placeholder:text-white/30"
              aria-label="Nume jucător pentru clasament"
            />
            <button
              onClick={handleSave}
              disabled={!playerName.trim()}
              aria-label="Salvează scorul"
              className="btn-space bg-cosmic-cyan/20 border-2 border-cosmic-cyan text-cosmic-cyan
                         hover:bg-cosmic-cyan hover:text-space-black focus:ring-cosmic-cyan px-4"
            >
              ✓
            </button>
          </div>
        </div>
      ) : (
        <p className="font-nunito text-success-green text-lg mb-6">
          ✅ Scor salvat în clasament!
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <button
          onClick={() => onRestart(levelIndex)}
          aria-label="Încearcă din nou același nivel"
          className="btn-space flex-1 bg-nebula-purple/20 border-2 border-nebula-purple
                     text-white hover:bg-nebula-purple focus:ring-nebula-purple"
        >
          🔄 Reîncearcă
        </button>
        <button
          onClick={onHome}
          aria-label="Înapoi la meniu principal"
          className="btn-space flex-1 bg-white/10 border-2 border-white/30 text-white
                     hover:bg-white/20 focus:ring-white"
        >
          ← Meniu
        </button>
      </div>
    </motion.div>
  );
}
