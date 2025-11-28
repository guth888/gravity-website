import { useState, useEffect } from 'react';

interface UseRotatingTextOptions {
  interval?: number; // How long each text displays (ms)
  transitionDuration?: number; // Fade transition duration (ms)
  initialDelay?: number; // Delay before starting rotation (ms)
}

export const useRotatingText = (
  texts: string[],
  options: UseRotatingTextOptions = {}
) => {
  const {
    interval = 3500,
    transitionDuration = 500,
    initialDelay = 0,
  } = options;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Handle initial delay
    if (!hasStarted && initialDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
        setIsVisible(true);
      }, initialDelay);
      return () => clearTimeout(startTimer);
    } else if (!hasStarted) {
      setHasStarted(true);
      setIsVisible(true);
    }
  }, [hasStarted, initialDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    // Set up rotation interval
    const rotationTimer = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Wait for fade out, then change text and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsVisible(true);
      }, transitionDuration);
    }, interval + transitionDuration);

    return () => clearInterval(rotationTimer);
  }, [hasStarted, texts.length, interval, transitionDuration]);

  return {
    currentText: texts[currentIndex],
    isVisible,
    currentIndex,
  };
};
