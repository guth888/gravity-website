import { useEffect, useState } from 'react';

export const useTypingEffect = (text: string, speed = 30, shouldStart = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, shouldStart]);

  return { displayedText, isComplete };
};
