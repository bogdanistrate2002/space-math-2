import { useCallback } from 'react';
import StarBackground from './components/ui/StarBackground';
import MuteButton from './components/ui/MuteButton';
import AchievementToast from './components/ui/AchievementToast';
import HomeScreen from './components/screens/HomeScreen';
import GameScreen from './components/screens/GameScreen';
import LevelCompleteScreen from './components/screens/LevelCompleteScreen';
import GameOverScreen from './components/screens/GameOverScreen';
import LeaderboardScreen from './components/screens/LeaderboardScreen';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';
import { useConfetti } from './hooks/useConfetti';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useAchievements } from './hooks/useAchievements';

// Componenta rădăcină — gestionează navigarea între ecrane
export default function App(): JSX.Element {
  const game = useGameState();
  const audio = useAudio();
  const confetti = useConfetti();
  const leaderboard = useLeaderboard();
  const achievements = useAchievements();

  const { state } = game;

  // Callback apelat de GameScreen la finalul unui nivel
  const handleLevelComplete = useCallback(() => {
    achievements.checkAndUnlock(state);
  }, [achievements, state]);

  // Determină ce ecran se afișează în funcție de faza jocului
  const renderScreen = (): JSX.Element => {
    switch (state.phase) {
      case 'home':
        return (
          <HomeScreen
            onStartLevel={(idx) => {
              audio.startBackground();
              game.startLevel(idx);
            }}
            onShowLeaderboard={game.showLeaderboard}
          />
        );

      case 'playing':
        return (
          <GameScreen
            game={game}
            audio={audio}
            confetti={confetti}
            onLevelComplete={handleLevelComplete}
          />
        );

      case 'levelComplete':
        return (
          <LevelCompleteScreen
            levelIndex={state.levelIndex}
            score={state.score}
            lives={state.lives}
            audio={audio}
            confetti={confetti}
            onContinue={game.continueNextLevel}
            onHome={() => {
              audio.stopBackground();
              game.goHome();
            }}
          />
        );

      case 'gameOver':
        return (
          <GameOverScreen
            score={state.score}
            levelReached={state.levelIndex + 1}
            audio={audio}
            leaderboard={leaderboard}
            onHome={() => {
              audio.stopBackground();
              game.goHome();
            }}
            onRestart={(levelIndex) => {
              game.startLevel(levelIndex);
            }}
            levelIndex={state.levelIndex}
          />
        );

      case 'leaderboard':
        return (
          <LeaderboardScreen
            leaderboard={leaderboard}
            achievements={achievements}
            onHome={game.goHome}
          />
        );
    }
  };

  return (
    <div className="relative bg-space-black min-h-screen">
      <StarBackground />
      <MuteButton audio={audio} />
      <AchievementToast
        achievementId={achievements.pendingToast}
        onDismiss={achievements.dismissToast}
      />
      {renderScreen()}
    </div>
  );
}
