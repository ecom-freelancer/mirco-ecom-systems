import { IBase } from 'modules/_shared/types';

export interface IUser extends IBase {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  avatarUrl?: string;
  isVerified?: boolean;
  phonenumber?: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}
