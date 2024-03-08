// create context

import React from 'react';
import { ILoginPayload, IUser } from '../types';

export interface IAuthContext {
  user?: IUser;
  login?: (payload: ILoginPayload) => Promise<void>;
  logout?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({});
