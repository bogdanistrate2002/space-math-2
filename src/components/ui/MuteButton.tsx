import type { AudioManager } from '../../types/audio';

interface MuteButtonProps {
  audio: Pick<AudioManager, 'isMuted' | 'toggleMute'>;
}

// Buton mute/unmute afișat în colțul dreapta sus pe toate ecranele
export default function MuteButton({ audio }: MuteButtonProps): JSX.Element {
  return (
    <button
      onClick={audio.toggleMute}
      aria-label={audio.isMuted ? 'Activează sunetul' : 'Dezactivează sunetul'}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 border border-white/20
                 flex items-center justify-center text-xl hover:bg-white/20 transition-colors
                 focus:outline-none focus:ring-2 focus:ring-cosmic-cyan"
    >
      {audio.isMuted ? '🔇' : '🔊'}
    </button>
  );
}
