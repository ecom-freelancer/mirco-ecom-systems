import { Navigate } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { routeKeys } from 'configs/constants';

export interface ProtectedRouterProviderProps {
  children: React.ReactNode;
}

export const ProtectedRouterProvider: React.FC<
  ProtectedRouterProviderProps
> = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={routeKeys.signin} />;
  }

  console.log('pass protected router provider');

  return children;
};
