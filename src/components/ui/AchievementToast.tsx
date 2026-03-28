import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { ACHIEVEMENTS } from '../../constants/achievements';
import type { AchievementId } from '../../types/storage';

interface AchievementToastProps {
  achievementId: AchievementId | null;
  onDismiss: () => void;
}

// Toast care apare în colț când se deblochează un achievement
export default function AchievementToast({ achievementId, onDismiss }: AchievementToastProps): JSX.Element {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

  // Auto-dismiss după 4 secunde
  useEffect(() => {
    if (!achievementId) return;
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [achievementId, onDismiss]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 card-glass p-4 max-w-xs
                     border border-star-yellow/50 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
          role="alert"
          aria-live="assertive"
        >
          <p className="font-orbitron text-star-yellow text-xs uppercase tracking-wider mb-1">
            Achievement Deblocat!
          </p>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{achievement.emoji}</span>
            <div>
              <p className="font-nunito font-bold text-white">{achievement.name}</p>
              <p className="font-nunito text-white/60 text-sm">{achievement.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
