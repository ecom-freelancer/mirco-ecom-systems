/**
 * Login with password API
 */

import { IUser } from './user';

export interface ILoginWithPasswordPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  idToken: string;
  user: IUser;
}
