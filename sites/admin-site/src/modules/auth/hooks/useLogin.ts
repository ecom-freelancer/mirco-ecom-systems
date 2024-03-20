import { useState } from 'react';
import { authService } from '../auth-service';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router';
import { routeKeys } from 'configs/constants';
import toast from 'react-hot-toast';
import { IApiError } from 'modules/_shared/types';

export const useLogin = () => {
  const { setUserLoggedIn, logout } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const loginWithPassword = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.loginWithPassword(username, password);
      setUserLoggedIn?.(response);

      navigate(routeKeys.home);
    } catch (e) {
      console.error(e);
      toast.error('Login failed', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setLoading(true);
      await authService.changePassword(oldPassword, newPassword);
      toast.success('Password changed', {
        position: 'top-center',
      });
      logout?.();
    } catch (error) {
      toast.error((error as IApiError)?.message, {});
    } finally {
      setLoading(false);
    }
  };

  return { loginWithPassword, loading, changePassword };
};
