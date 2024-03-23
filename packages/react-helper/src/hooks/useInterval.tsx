import { useEffect } from 'react';
import { useCountdown } from './useCountdown';

export const useInterval = (
  callback: () => void,
  options: { delay: number; condition: boolean; activeOnStart?: boolean },
) => {
  const { condition, delay, activeOnStart } = options;
  const onTimeEnd = () => {
    if (condition) {
      callback();
      setTime(delay);
    }
  };

  useEffect(() => {
    if (activeOnStart && condition) {
      callback();
    }
  }, [condition, activeOnStart, callback]);

  const [, setTime] = useCountdown(delay, {
    onEnd: onTimeEnd,
  });
};
