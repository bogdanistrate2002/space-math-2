import { QUESTIONS_PER_LEVEL } from '../../constants/levels';

interface ProgressBarProps {
  questionIndex: number; // 0-9 (întrebarea curentă, 0-indexed)
}

// Bară de progres care arată câte întrebări au fost completate
export default function ProgressBar({ questionIndex }: ProgressBarProps): JSX.Element {
  const percent = Math.round((questionIndex / QUESTIONS_PER_LEVEL) * 100);

  return (
    <div
      className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
      role="progressbar"
      aria-valuenow={questionIndex}
      aria-valuemin={0}
      aria-valuemax={QUESTIONS_PER_LEVEL}
      aria-label={`Întrebarea ${questionIndex + 1} din ${QUESTIONS_PER_LEVEL}`}
    >
      <div
        className="h-full bg-gradient-to-r from-nebula-purple to-cosmic-cyan rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
