// Operații matematice suportate
export type Operation = '+' | '-' | '*' | '/';

// Fazele jocului — controlează ce ecran se afișează
export type GamePhase =
  | 'home'
  | 'playing'
  | 'levelComplete'
  | 'gameOver'
  | 'leaderboard';

// O întrebare generată cu 4 variante de răspuns
export interface Question {
  id: string;
  operand1: number;
  operand2: number;
  operation: Operation;
  correctAnswer: number;
  options: number[]; // exact 4 elemente, include correctAnswer, mixate
}

// Configurația unui nivel
export interface Level {
  id: number;          // 1-5
  name: string;        // 'Cadet', 'Pilot', 'Comandant', 'Explorator', 'Maestru Cosmic'
  operations: Operation[];
  maxNumber: number;   // operanzii sunt în intervalul [1, maxNumber]
  allowNegative: boolean; // false pentru nivelurile 1-2
  emoji: string;
  description: string; // descriere scurtă pentru HomeScreen
}

// Starea completă a jocului — gestionată de reducer
export interface GameState {
  phase: GamePhase;
  levelIndex: number;          // 0-4, index în array LEVELS
  questionIndex: number;       // 0-9, întrebarea curentă din nivel
  lives: number;               // 0-3
  score: number;               // scor curent sesiune
  consecutiveCorrect: number;  // pentru achievement speed_demon
  question: Question | null;   // întrebarea afișată momentan
  selectedAnswer: number | null; // răspunsul selectat de utilizator (pentru feedback)
  answerFeedback: 'correct' | 'wrong' | null; // starea de feedback vizual
  highScore: number;           // cel mai bun scor (din localStorage)
}

// Acțiunile reducerului
export type GameAction =
  | { type: 'START_LEVEL'; levelIndex: number; question: Question; highScore: number }
  | { type: 'SELECT_ANSWER'; answer: number; isCorrect: boolean; points: number }
  | { type: 'ADVANCE'; nextQuestion: Question }
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'GAME_OVER' }
  | { type: 'GO_HOME' }
  | { type: 'SHOW_LEADERBOARD' }
  | { type: 'CONTINUE_NEXT_LEVEL'; question: Question };
