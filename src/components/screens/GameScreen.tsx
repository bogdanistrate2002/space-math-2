import { useEffect, useMemo, useRef } from 'react';
import type { UseGameStateReturn } from '../../hooks/useGameState';
import type { AudioManager } from '../../types/audio';
import type { UseConfettiReturn } from '../../hooks/useConfetti';
import { LEVELS } from '../../constants/levels';
import QuestionCard from '../game/QuestionCard';
import AnswerButton from '../game/AnswerButton';
import LivesDisplay from '../game/LivesDisplay';
import ScoreDisplay from '../game/ScoreDisplay';
import ProgressBar from '../game/ProgressBar';
import LevelBadge from '../game/LevelBadge';
import { randomMessage, CORRECT_MESSAGES, WRONG_MESSAGES } from '../../constants/messages';

interface GameScreenProps {
  game: UseGameStateReturn;
  audio: AudioManager;
  confetti: UseConfettiReturn;
  onLevelComplete: () => void; // apelat după LEVEL_COMPLETE pentru a rula logica de achievements
}

type FeedbackState = 'correct' | 'wrong' | 'highlight-correct' | 'neutral' | 'disabled';

// Ecranul principal de joc — orchestrează toate componentele de joc
export default function GameScreen({
  game,
  audio,
  confetti,
  onLevelComplete,
}: GameScreenProps): JSX.Element {
  const { state, selectAnswer } = game;
  const { question, answerFeedback, selectedAnswer, lives, score, highScore, questionIndex, levelIndex } = state;
  // Mesajul de feedback — derivat din answerFeedback, stabil până la următoarea schimbare
  const feedbackMessage = useMemo(() => {
    if (answerFeedback === 'correct') return randomMessage(CORRECT_MESSAGES);
    if (answerFeedback === 'wrong') return randomMessage(WRONG_MESSAGES);
    return '';
  }, [answerFeedback]);

  const prevPhase = useRef(state.phase);

  // Detectează tranziția la levelComplete și notifică părintele
  useEffect(() => {
    if (prevPhase.current === 'playing' && state.phase === 'levelComplete') {
      onLevelComplete();
    }
    prevPhase.current = state.phase;
  }, [state.phase, onLevelComplete]);

  // Reacționează la feedback audio + vizual (fără setState — efecte externe pure)
  useEffect(() => {
    if (answerFeedback === 'correct') {
      audio.playSound('correct');
      confetti.fireConfetti();
    } else if (answerFeedback === 'wrong') {
      audio.playSound('wrong');
    }
  }, [answerFeedback, audio, confetti]);

  if (!question) return <div className="text-white p-8">Se încarcă...</div>;

  const level = LEVELS[levelIndex]!;

  // Calculează starea fiecărui buton de răspuns
  const getButtonState = (value: number): FeedbackState => {
    if (answerFeedback === null) return 'neutral';
    if (value === question.correctAnswer && answerFeedback === 'correct') return 'correct';
    if (value === selectedAnswer && answerFeedback === 'wrong') return 'wrong';
    if (value === question.correctAnswer && answerFeedback === 'wrong') return 'highlight-correct';
    return 'disabled';
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-8 max-w-2xl mx-auto">
      {/* Header — nivel, scor, vieți */}
      <div className="flex items-center justify-between mb-6">
        <LevelBadge level={level} />
        <ScoreDisplay score={score} highScore={highScore} />
        <LivesDisplay lives={lives} />
      </div>

      {/* Bară progres */}
      <ProgressBar questionIndex={questionIndex} />

      {/* Întrebare */}
      <div className="flex-1 flex flex-col justify-center gap-6 mt-6">
        <QuestionCard
          question={question}
          isShaking={answerFeedback === 'wrong'}
        />

        {/* Mesaj feedback */}
        {feedbackMessage && answerFeedback && (
          <p
            className={`text-center font-nunito font-bold text-lg transition-opacity ${
              answerFeedback === 'correct' ? 'text-success-green' : 'text-danger-red'
            }`}
            aria-live="assertive"
          >
            {feedbackMessage}
          </p>
        )}

        {/* Grid butoane răspuns */}
        <div className="grid grid-cols-2 gap-3">
          {question.options.map((option) => (
            <AnswerButton
              key={option}
              value={option}
              feedbackState={getButtonState(option)}
              onClick={() => selectAnswer(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
