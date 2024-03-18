import { createContext, useContext } from 'react';
import { IUser } from '../user/user.type';

export interface AuthContextType {
  userId?: string;
  user?: IUser;
  openLoginModal?: () => void;
}

export const AuthContext = createContext<AuthContextType>({});
export const useAuthContext = () => useContext(AuthContext);
