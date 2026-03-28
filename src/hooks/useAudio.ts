import { useState, useRef, useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import type { AudioManager, SoundType } from '../types/audio';

// Config pentru fallback Web Audio API (când lipsesc fișierele MP3)
interface FallbackConfig {
  frequency: number;
  duration: number;
  type: OscillatorType;
  volume: number;
}

const FALLBACK_CONFIGS: Record<SoundType, FallbackConfig> = {
  correct: { frequency: 523.25, duration: 0.35, type: 'sine', volume: 0.3 },
  wrong: { frequency: 150, duration: 0.4, type: 'sawtooth', volume: 0.25 },
  levelup: { frequency: 659.25, duration: 0.8, type: 'sine', volume: 0.35 },
  gameover: { frequency: 110, duration: 1.2, type: 'triangle', volume: 0.3 },
  background: { frequency: 220, duration: 0.1, type: 'sine', volume: 0 }, // fără fallback bg
};

// Generează un sunet programatic cu Web Audio API
function playWebAudioFallback(config: FallbackConfig): void {
  if (config.volume === 0) return;
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = config.frequency;
    osc.type = config.type;
    gain.gain.setValueAtTime(config.volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + config.duration);
    // Curăță contextul după redare
    osc.onended = () => void ctx.close();
  } catch {
    // AudioContext indisponibil — ignorăm silențios
  }
}

const SOUND_FILES: Record<SoundType, string> = {
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  levelup: '/sounds/levelup.mp3',
  gameover: '/sounds/gameover.mp3',
  background: '/sounds/background.mp3',
};

export function useAudio(): AudioManager {
  const [isMuted, setIsMuted] = useState(false);
  const howls = useRef<Map<SoundType, Howl>>(new Map());
  const usingFallback = useRef(false);
  const bgRef = useRef<Howl | null>(null);

  // Inițializează Howler la montare (async — verifică dacă fișierele există)
  useEffect(() => {
    let active = true;

    const initHowler = async (): Promise<void> => {
      try {
        // Verifică disponibilitatea unui fișier de test
        const res = await fetch(SOUND_FILES.correct, { method: 'HEAD' });
        if (!active) return;

        if (res.ok) {
          // Fișierele există — inițializează Howler
          const types: SoundType[] = ['correct', 'wrong', 'levelup', 'gameover'];
          types.forEach((type) => {
            howls.current.set(
              type,
              new Howl({ src: [SOUND_FILES[type]!], volume: 0.7, preload: true }),
            );
          });
          bgRef.current = new Howl({
            src: [SOUND_FILES.background],
            loop: true,
            volume: 0.3,
            preload: true,
          });
        } else {
          usingFallback.current = true;
        }
      } catch {
        usingFallback.current = true;
      }
    };

    void initHowler();

    const howlsSnapshot = howls.current;
    const bgSnapshot = bgRef.current;
    return () => {
      active = false;
      howlsSnapshot.forEach((h) => h.unload());
      bgSnapshot?.unload();
    };
  }, []);

  const playSound = useCallback((type: SoundType): void => {
    if (isMuted) return;

    const howl = howls.current.get(type);
    if (howl) {
      howl.play();
    } else {
      // Fallback la Web Audio API
      const config = FALLBACK_CONFIGS[type];
      if (config) playWebAudioFallback(config);
    }
  }, [isMuted]);

  const startBackground = useCallback((): void => {
    if (isMuted || !bgRef.current) return;
    if (!bgRef.current.playing()) bgRef.current.play();
  }, [isMuted]);

  const stopBackground = useCallback((): void => {
    bgRef.current?.stop();
  }, []);

  const toggleMute = useCallback((): void => {
    setIsMuted((prev) => {
      const next = !prev;
      Howler.mute(next);
      return next;
    });
  }, []);

  return { playSound, startBackground, stopBackground, isMuted, toggleMute };
}
