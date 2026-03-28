import { LEVELS } from '../../constants/levels';
import type { Level } from '../../types/game';
import { getStorageData } from '../../utils/storageManager';

interface HomeScreenProps {
  onStartLevel: (levelIndex: number) => void;
  onShowLeaderboard: () => void;
}

// Ecranul principal — selectare nivel și navigare la clasament
export default function HomeScreen({ onStartLevel, onShowLeaderboard }: HomeScreenProps): JSX.Element {
  const storage = getStorageData();
  const unlockedLevels = storage.unlockedLevels;

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-star-yellow neon-text mb-2">
          Misiunea
        </h1>
        <h1 className="font-orbitron text-4xl md:text-6xl font-black text-cosmic-cyan neon-text">
          Matematică 🚀
        </h1>
        <p className="font-nunito text-white/60 mt-3 text-lg">
          Alege nivelul tău de dificultate!
        </p>
        {storage.highScore > 0 && (
          <p className="font-orbitron text-star-yellow text-sm mt-2">
            🏆 Record: {storage.highScore} puncte
          </p>
        )}
      </div>

      {/* Grilă niveluri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl mb-8">
        {LEVELS.map((level: Level, idx: number) => {
          const isUnlocked = unlockedLevels.includes(level.id);
          return (
            <button
              key={level.id}
              onClick={() => isUnlocked && onStartLevel(idx)}
              disabled={!isUnlocked}
              aria-label={isUnlocked ? `Pornește nivelul ${level.name}` : `Nivel ${level.name} blocat`}
              className={`card-glass p-5 text-left transition-all duration-200
                          ${isUnlocked
                            ? 'hover:border-cosmic-cyan/50 hover:scale-105 cursor-pointer'
                            : 'opacity-40 cursor-not-allowed'
                          }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{isUnlocked ? level.emoji : '🔒'}</span>
                <span className="font-orbitron font-bold text-cosmic-cyan text-sm uppercase">
                  Nivel {level.id}
                </span>
              </div>
              <p className="font-orbitron font-bold text-white text-lg">{level.name}</p>
              <p className="font-nunito text-white/60 text-sm mt-1">{level.description}</p>
            </button>
          );
        })}
      </div>

      {/* Buton clasament */}
      <button
        onClick={onShowLeaderboard}
        aria-label="Deschide clasamentul"
        className="btn-space bg-rocket-orange/20 border-2 border-rocket-orange text-rocket-orange
                   hover:bg-rocket-orange hover:text-white focus:ring-rocket-orange px-8"
      >
        🏆 Clasament & Achievements
      </button>
    </div>
  );
}
