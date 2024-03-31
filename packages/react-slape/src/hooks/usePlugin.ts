import { useMemo } from 'react';
import { SlapePlugin } from '../types';
import { useSlape } from './useSlape';

export const usePlugin = <T extends SlapePlugin>(name: string) => {
  const { plugins } = useSlape();

  const plugin = useMemo(() => {
    return plugins.find((p) => p.name === name);
  }, []);

  if (!plugin) {
    throw new Error(`Plugin ${name} not found`);
  }

  return plugin as T;
};
