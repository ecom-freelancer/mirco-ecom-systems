import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../hooks/useAuthContext';
import { routeKeys } from 'configs/constants';

export interface ProtectedRouterProviderProps {}

export const ProtectedRouterProvider: React.FC<
  ProtectedRouterProviderProps
> = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={routeKeys.signIn} />;
  }

  return <Outlet />;
};
