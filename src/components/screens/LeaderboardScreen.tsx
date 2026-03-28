import { useEffect } from 'react';
import type { UseLeaderboardReturn } from '../../hooks/useLeaderboard';
import type { UseAchievementsReturn } from '../../hooks/useAchievements';
import AchievementsGallery from '../ui/AchievementsGallery';

interface LeaderboardScreenProps {
  leaderboard: UseLeaderboardReturn;
  achievements: UseAchievementsReturn;
  onHome: () => void;
}

// Clasament top 10 + galerie achievements
export default function LeaderboardScreen({
  leaderboard,
  achievements,
  onHome,
}: LeaderboardScreenProps): JSX.Element {
  useEffect(() => {
    leaderboard.refresh();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative z-10 min-h-screen p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8 pt-4">
        <h2 className="font-orbitron text-3xl font-black text-star-yellow">🏆 Clasament</h2>
        <button
          onClick={onHome}
          aria-label="Înapoi la meniu"
          className="btn-space bg-white/10 border-2 border-white/30 text-white
                     hover:bg-white/20 focus:ring-white text-sm px-4 py-2"
        >
          ← Meniu
        </button>
      </div>

      {/* Top 10 */}
      {leaderboard.entries.length === 0 ? (
        <div className="card-glass p-8 text-center mb-8">
          <p className="font-nunito text-white/50 text-lg">Niciun scor înregistrat încă.</p>
          <p className="font-nunito text-white/30 text-sm mt-2">Joacă primul joc pentru a apărea!</p>
        </div>
      ) : (
        <div className="space-y-2 mb-8">
          {leaderboard.entries.map((entry, idx) => (
            <div
              key={`${entry.name}-${entry.date}`}
              className={`card-glass p-4 flex items-center gap-4
                ${idx === 0 ? 'border-star-yellow/50' : ''}`}
            >
              <span className="font-orbitron font-black text-2xl w-8 text-center
                               text-white/60">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`}
              </span>
              <div className="flex-1">
                <p className="font-nunito font-bold text-white">{entry.name}</p>
                <p className="font-nunito text-white/40 text-xs">
                  Nivel {entry.levelReached} • {new Date(entry.date).toLocaleDateString('ro-RO')}
                </p>
              </div>
              <span className="font-orbitron font-bold text-star-yellow text-xl">
                {entry.score}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      <AchievementsGallery unlockedIds={achievements.unlockedAchievements} />
    </div>
  );
}
