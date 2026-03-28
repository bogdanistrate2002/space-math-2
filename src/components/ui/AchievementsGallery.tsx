import { ACHIEVEMENTS } from '../../constants/achievements';
import type { AchievementId } from '../../types/storage';

interface AchievementsGalleryProps {
  unlockedIds: AchievementId[];
}

// Galerie cu toate cele 8 achievements (deblocate sau cu lacăt)
export default function AchievementsGallery({ unlockedIds }: AchievementsGalleryProps): JSX.Element {
  const unlockedSet = new Set(unlockedIds);

  return (
    <div>
      <h3 className="font-orbitron text-cosmic-cyan text-lg font-bold mb-4 text-center">
        🏅 Achievements
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedSet.has(ach.id);
          return (
            <div
              key={ach.id}
              className={`card-glass p-3 text-center transition-all ${
                isUnlocked ? 'border-star-yellow/40' : 'opacity-40'
              }`}
              aria-label={`${ach.name}: ${isUnlocked ? 'deblocat' : 'blocat'}`}
            >
              <span className="text-3xl block mb-1">
                {isUnlocked ? ach.emoji : '🔒'}
              </span>
              <p className="font-nunito text-white text-xs font-bold">{ach.name}</p>
              <p className="font-nunito text-white/50 text-xs mt-1">{ach.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
