import type { Level } from '../../types/game';

interface LevelBadgeProps {
  level: Level;
}

// Badge cu numele și emoji-ul nivelului curent
export default function LevelBadge({ level }: LevelBadgeProps): JSX.Element {
  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 border border-white/20">
      <span className="text-lg" aria-hidden="true">{level.emoji}</span>
      <span className="font-orbitron text-sm font-bold text-cosmic-cyan uppercase tracking-wider">
        {level.name}
      </span>
    </div>
  );
}
