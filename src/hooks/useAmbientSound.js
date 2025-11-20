import { useEffect, useRef, useState } from 'react';

const AMBIENT_SOUNDS = {
  rain: '/sounds/rain.mp3',
  forest: '/sounds/forest.mp3',
  coffee: '/sounds/coffee.mp3',
  whitenoise: '/sounds/whitenoise.mp3',
};

export const useAmbientSound = () => {
  const [currentSound, setCurrentSound] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = (soundName) => {
    if (!audioRef.current) return;

    if (currentSound === soundName && isPlaying) {
      // Already playing this sound
      return;
    }

    const soundUrl = AMBIENT_SOUNDS[soundName];
    if (!soundUrl) return;

    audioRef.current.src = soundUrl;
    audioRef.current
      .play()
      .then(() => {
        setCurrentSound(soundName);
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error('Error playing sound:', error);
      });
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentSound(null);
    }
  };

  const toggle = (soundName) => {
    if (currentSound === soundName && isPlaying) {
      pause();
    } else {
      play(soundName);
    }
  };

  return {
    currentSound,
    volume,
    isPlaying,
    setVolume,
    play,
    pause,
    stop,
    toggle,
    availableSounds: Object.keys(AMBIENT_SOUNDS),
  };
};
