interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

// Afișează scorul curent și cel mai bun scor
export default function ScoreDisplay({ score, highScore }: ScoreDisplayProps): JSX.Element {
  return (
    <div className="text-center" role="status" aria-live="polite">
      <p className="font-orbitron text-star-yellow text-2xl font-bold">{score}</p>
      <p className="font-nunito text-white/50 text-xs">SCOR</p>
      {highScore > 0 && (
        <p className="font-nunito text-white/30 text-xs mt-1">RECORD: {highScore}</p>
      )}
    </div>
  );
}
