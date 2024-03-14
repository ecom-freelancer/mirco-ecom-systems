import { useMemo } from 'react';
import { debounceAsync } from '../utils';

export const useDebounceAsync = <V, T extends (...args) => Promise<V>>(
  func: T,
  onResolve: (res: V) => void,
  timeout: number = 300,
  [...depenencies],
) => {
  return useMemo(() => {
    return debounceAsync(func, onResolve, timeout);
  }, [...depenencies]);
};
