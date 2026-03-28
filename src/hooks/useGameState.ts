import { useReducer, useCallback, useRef, useEffect } from 'react';
import type { GameState, GameAction, GamePhase } from '../types/game';
import { LEVELS, INITIAL_LIVES, QUESTIONS_PER_LEVEL } from '../constants/levels';
import { generateQuestion } from '../utils/questionGenerator';
import { calculatePoints, FEEDBACK_DELAY_MS } from '../utils/scoreCalculator';
import { getStorageData } from '../utils/storageManager';

// Starea inițială la deschiderea aplicației
const createInitialState = (): GameState => ({
  phase: 'home' as GamePhase,
  levelIndex: 0,
  questionIndex: 0,
  lives: INITIAL_LIVES,
  score: 0,
  consecutiveCorrect: 0,
  question: null,
  selectedAnswer: null,
  answerFeedback: null,
  highScore: 0,
});

// Reductor pur — gestionează toate tranzițiile de stare
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_LEVEL':
      return {
        ...createInitialState(),
        phase: 'playing',
        levelIndex: action.levelIndex,
        question: action.question,
        highScore: action.highScore,
      };

    case 'SELECT_ANSWER': {
      const newConsecutive = action.isCorrect
        ? state.consecutiveCorrect + 1
        : 0;
      const newLives = action.isCorrect ? state.lives : state.lives - 1;
      return {
        ...state,
        selectedAnswer: action.answer,
        answerFeedback: action.isCorrect ? 'correct' : 'wrong',
        score: state.score + action.points,
        lives: newLives,
        consecutiveCorrect: newConsecutive,
      };
    }

    case 'ADVANCE': {
      // Verifică dacă jocul s-a terminat (vieți epuizate după feedback)
      if (state.lives <= 0) {
        return { ...state, phase: 'gameOver', selectedAnswer: null, answerFeedback: null };
      }
      // Verifică dacă nivelul s-a terminat (toate întrebările răspunse)
      if (state.questionIndex >= QUESTIONS_PER_LEVEL - 1) {
        return { ...state, phase: 'levelComplete', selectedAnswer: null, answerFeedback: null };
      }
      // Avansează la întrebarea următoare
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        question: action.nextQuestion,
        selectedAnswer: null,
        answerFeedback: null,
      };
    }

    case 'LEVEL_COMPLETE':
      return { ...state, phase: 'levelComplete', selectedAnswer: null, answerFeedback: null };

    case 'GAME_OVER':
      return { ...state, phase: 'gameOver', selectedAnswer: null, answerFeedback: null };

    case 'CONTINUE_NEXT_LEVEL':
      return {
        ...state,
        phase: 'playing',
        levelIndex: state.levelIndex + 1,
        questionIndex: 0,
        lives: INITIAL_LIVES,
        question: action.question,
        selectedAnswer: null,
        answerFeedback: null,
        consecutiveCorrect: 0,
      };

    case 'GO_HOME':
      return createInitialState();

    case 'SHOW_LEADERBOARD':
      return { ...state, phase: 'leaderboard' };

    default:
      return state;
  }
}

// Interfața publică a hook-ului
export interface UseGameStateReturn {
  state: GameState;
  startLevel: (levelIndex: number) => void;
  selectAnswer: (answer: number) => void;
  continueNextLevel: () => void;
  goHome: () => void;
  showLeaderboard: () => void;
}

export function useGameState(): UseGameStateReturn {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  // Ref pentru a accesa starea curentă din setTimeout fără stale closure
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Pornește un nivel — încarcă highscore-ul din localStorage
  const startLevel = useCallback((levelIndex: number) => {
    const storage = getStorageData();
    const level = LEVELS[levelIndex];
    if (!level) return;
    const question = generateQuestion(level);
    dispatch({
      type: 'START_LEVEL',
      levelIndex,
      question,
      highScore: storage.highScore,
    });
  }, []);

  // Procesează răspunsul selectat, actualizează scorul, programează avansarea
  const selectAnswer = useCallback((answer: number) => {
    const current = stateRef.current;
    if (current.answerFeedback !== null || current.question === null) return;

    const isCorrect = answer === current.question.correctAnswer;
    const points = calculatePoints(current.levelIndex, current.consecutiveCorrect, isCorrect);

    dispatch({ type: 'SELECT_ANSWER', answer, isCorrect, points });

    // Avansează după delay-ul de feedback
    const levelIndex = current.levelIndex;
    setTimeout(() => {
      const level = LEVELS[levelIndex];
      if (!level) return;
      const nextQuestion = generateQuestion(level);
      dispatch({ type: 'ADVANCE', nextQuestion });
    }, FEEDBACK_DELAY_MS);
  }, []);

  // Continuă la nivelul următor după ecranul levelComplete
  const continueNextLevel = useCallback(() => {
    const current = stateRef.current;
    const nextLevelIndex = current.levelIndex + 1;
    if (nextLevelIndex >= LEVELS.length) {
      dispatch({ type: 'SHOW_LEADERBOARD' });
      return;
    }
    const level = LEVELS[nextLevelIndex];
    if (!level) return;
    const question = generateQuestion(level);
    dispatch({ type: 'CONTINUE_NEXT_LEVEL', question });
  }, []);

  const goHome = useCallback(() => dispatch({ type: 'GO_HOME' }), []);
  const showLeaderboard = useCallback(() => dispatch({ type: 'SHOW_LEADERBOARD' }), []);

  return { state, startLevel, selectAnswer, continueNextLevel, goHome, showLeaderboard };
}
