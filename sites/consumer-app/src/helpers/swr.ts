import { mutate } from 'swr';

export const clearAllSwrCache = () => mutate(() => true, undefined, false);
