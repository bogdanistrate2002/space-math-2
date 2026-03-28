import { INITIAL_LIVES } from '../../constants/levels';

interface LivesDisplayProps {
  lives: number;
}

// Afișează 3 inimi — pline sau goale în funcție de vieți rămase
export default function LivesDisplay({ lives }: LivesDisplayProps): JSX.Element {
  return (
    <div className="flex gap-1" aria-label={`Vieți rămase: ${lives}`} role="status">
      {Array.from({ length: INITIAL_LIVES }, (_, i) => (
        <span key={i} className={`text-2xl transition-all duration-300 ${i < lives ? '' : 'opacity-20'}`}>
          {i < lives ? '❤️' : '🖤'}
        </span>
      ))}
    </div>
  );
}
