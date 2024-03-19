import { VerifyOtpActions } from '../constants/otp.constant';

export interface SendEmailPayload {
  destination: string;
  action: VerifyOtpActions;
  content: string;
}

export interface CurrentVerifyInfo {
  otp: string;
  verifyAttemptCount: string; // number
  requestAttemptTimestamp: string; // JSON format
  restrictedEndedAt: string;
}
