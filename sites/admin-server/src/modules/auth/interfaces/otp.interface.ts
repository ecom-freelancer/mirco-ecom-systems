import { VerifyOtpActions } from '../constants/otp.constant';

export interface SendOtpRequestPayload {
  otp: string;
  destination: string;
  action: VerifyOtpActions;
  content: string;

  orderId?: string; // case Confirm Order
}
