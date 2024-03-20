import { useEffect, useState } from 'react';
/**
 *
 * @param timer > 0
 * @param options
 * @returns
 */
export const useCountDown = (
  timer: number,
  options?: {
    onEnd?: () => void;
  },
) => {
  const [time, setTime] = useState(timer);

  useEffect(() => {
    if (time < 0) return;
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      options?.onEnd?.();
    }
  }, [time]);

  return [time, setTime] as const;
};
