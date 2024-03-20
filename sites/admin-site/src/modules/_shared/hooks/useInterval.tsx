import { useCountDown } from './useCountDown';
import { useEffect } from 'react';

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
  }, [condition, activeOnStart]);

  const [, setTime] = useCountDown(delay, {
    onEnd: onTimeEnd,
  });
};
