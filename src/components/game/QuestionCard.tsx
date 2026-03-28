import type { Question } from '../../types/game';

interface QuestionCardProps {
  question: Question;
  isShaking: boolean;
}

const OPERATION_SYMBOLS: Record<string, string> = {
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
};

// Afișează operația matematică curentă cu efect glassmorphism
export default function QuestionCard({ question, isShaking }: QuestionCardProps): JSX.Element {
  const symbol = OPERATION_SYMBOLS[question.operation] ?? question.operation;

  return (
    <div
      className={`card-glass p-8 text-center shadow-2xl ${isShaking ? 'animate-shake' : ''}`}
      role="region"
      aria-label="Întrebarea curentă"
      aria-live="polite"
    >
      <p className="font-orbitron text-4xl md:text-6xl font-bold text-white tracking-wide">
        {question.operand1}{' '}
        <span className="text-cosmic-cyan">{symbol}</span>{' '}
        {question.operand2}
        <span className="text-star-yellow"> = ?</span>
      </p>
    </div>
  );
}
