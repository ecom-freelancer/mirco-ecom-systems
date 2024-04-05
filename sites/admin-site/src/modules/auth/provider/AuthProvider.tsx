import { useUserInfo } from '../hooks/useUserInfo';
import { AuthContext } from './auth-context';

export interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, loading, mutate, setUserLogged, logout } = useUserInfo();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user: user,
        refresh: mutate,
        setUserLoggedIn: setUserLogged,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
