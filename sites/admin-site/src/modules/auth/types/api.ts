/**
 * Login with password API
 */

export interface ILoginWithPasswordPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}
