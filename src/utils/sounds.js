// Sound utility functions
const audioCache = new Map();

const SOUNDS = {
  start: '/sounds/start.mp3',
  complete: '/sounds/complete.mp3',
  break: '/sounds/break.mp3',
  tick: '/sounds/tick.mp3',
  achievement: '/sounds/achievement.mp3',
  levelup: '/sounds/levelup.mp3',
};

const preloadSound = (name) => {
  if (!SOUNDS[name]) return;

  if (!audioCache.has(name)) {
    const audio = new Audio(SOUNDS[name]);
    audio.preload = 'auto';
    audioCache.set(name, audio);
  }
};

const playSound = (name, volume = 0.7) => {
  if (!SOUNDS[name]) return;

  let audio = audioCache.get(name);

  if (!audio) {
    audio = new Audio(SOUNDS[name]);
    audioCache.set(name, audio);
  }

  audio.volume = volume;
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.error('Error playing sound:', error);
  });
};

const preloadAllSounds = () => {
  Object.keys(SOUNDS).forEach((name) => {
    preloadSound(name);
  });
};

export { playSound, preloadSound, preloadAllSounds, SOUNDS };
