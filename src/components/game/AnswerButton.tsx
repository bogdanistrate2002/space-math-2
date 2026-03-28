type FeedbackState = 'correct' | 'wrong' | 'highlight-correct' | 'neutral' | 'disabled';

interface AnswerButtonProps {
  value: number;
  feedbackState: FeedbackState;
  onClick: () => void;
}

// Un singur buton de răspuns cu stări vizuale pentru feedback
export default function AnswerButton({ value, feedbackState, onClick }: AnswerButtonProps): JSX.Element {
  const isDisabled = feedbackState === 'disabled' || feedbackState === 'correct'
    || feedbackState === 'wrong' || feedbackState === 'highlight-correct';

  const colorClasses: Record<FeedbackState, string> = {
    neutral: 'bg-nebula-purple/70 border-nebula-purple hover:bg-nebula-purple text-white focus:ring-nebula-purple',
    correct: 'bg-success-green/30 border-success-green text-success-green shadow-[0_0_20px_#39ff14]',
    wrong: 'bg-danger-red/30 border-danger-red text-danger-red',
    'highlight-correct': 'bg-success-green/30 border-success-green text-success-green shadow-[0_0_20px_#39ff14] animate-pulse-neon',
    disabled: 'bg-white/5 border-white/10 text-white/40',
  };

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={`Răspuns ${value}`}
      className={`btn-space w-full border-2 text-2xl font-bold py-4
                  ${colorClasses[feedbackState]} transition-all duration-300`}
    >
      {value}
    </button>
  );
}
