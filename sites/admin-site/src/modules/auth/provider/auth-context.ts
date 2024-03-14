// create context

import React from 'react';
import { ILoginResponse, IUser } from '../types';
import { KeyedMutator } from 'swr';

export interface IAuthContext {
  user?: IUser;
  logout?: () => void;
  refresh?: KeyedMutator<IUser | undefined>;
  setUserLoggedIn?: (data: ILoginResponse) => void;
}

export const AuthContext = React.createContext<IAuthContext>({});
