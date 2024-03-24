import { createContext, useContext } from 'react';
import { ILoginResponse, IUser } from './auth.interface';

export interface AuthContextType {
  userId?: string;
  user?: IUser;
  loading?: boolean;
  openLoginModal?: (mode: 'login' | 'register') => void;
  refresh: () => void;
  setLoginResponse: (loginResponse: ILoginResponse) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  refresh: () => {},
  setLoginResponse: () => {},
  logout: () => {},
});
export const useAuthContext = () => useContext(AuthContext);
