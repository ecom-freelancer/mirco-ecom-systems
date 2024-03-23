import { randomBytes } from 'crypto';

// generate an unique id for session
export const generateSessionId = (length: number = 32): string => {
  return randomBytes(length).toString('hex');
};
