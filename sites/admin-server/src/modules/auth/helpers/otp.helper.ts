import { VerifyOtpActions } from '../constants/otp.constant';
import { RedisKeyPrefix } from '@packages/nest-redis';

export const generateOtp = (): string => {
  // Generate a random number between 0 and 999999
  let otp = Math.floor(Math.random() * 1000000);

  // Convert the number to a six-digit string
  return otp.toString().padStart(6, '0');
};

export const actionsToSubjectMapping = new Map([
  [VerifyOtpActions.RESET_PASSWORD, 'Reset password'],
  [VerifyOtpActions.PURCHASE_ORDER, 'Confirm your order'],
]);

export const mapActionsToSubject = (action: VerifyOtpActions) => {
  return actionsToSubjectMapping.get(action);
};

export const getResetPasswordRedisKey = (account: string) => {
  return `${RedisKeyPrefix.RESET_PASSWORD}:${account}`;
};
