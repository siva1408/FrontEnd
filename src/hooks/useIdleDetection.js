import { useEffect, useRef, useState } from 'react';

export const useIdleDetection = (idleTime = 5 * 60 * 1000, onIdle) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      if (isIdle) {
        setIsIdle(false);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        if (onIdle) {
          onIdle();
        }
      }, idleTime);
    };

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [idleTime, onIdle, isIdle]);

  return isIdle;
};
