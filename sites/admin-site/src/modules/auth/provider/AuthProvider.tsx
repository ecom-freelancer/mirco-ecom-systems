import { useUserInfo } from '../hooks/useUserInfo';
import { AuthContext } from './auth-context';

export interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, loading } = useUserInfo();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
