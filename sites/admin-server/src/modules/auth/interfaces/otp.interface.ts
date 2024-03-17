import { VerifyOtpActions } from '../constants/otp.constant';

export interface SendEmailPayload {
  destination: string;
  action: VerifyOtpActions;
  content: string;
}
