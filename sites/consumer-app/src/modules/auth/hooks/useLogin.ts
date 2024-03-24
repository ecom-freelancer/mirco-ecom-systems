import { useState } from 'react';
import {
  ILoginResponse,
  ILoginWithPasswordPayload,
  IRegisterPayload,
} from '../auth.interface';
import { authService } from '../auth.service';
import { useAuthContext } from '../auth-context';
import { clearAllSwrCache } from '@/helpers/swr';
import toast from 'react-hot-toast';
import { ApiError } from 'next/dist/server/api-utils';
import { GoogleLoginResponse } from '@packages/react-user';

export const useLogin = () => {
  const { setLoginResponse, refresh } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const afterLoginSuccess = async (loginRespose: ILoginResponse) => {
    setLoginResponse(loginRespose);
    await clearAllSwrCache();
    refresh();
  };

  const loginWithPassword = async (payload: ILoginWithPasswordPayload) => {
    try {
      setLoading(true);
      const loginRespose = await authService.loginWithPassword(payload);
      await afterLoginSuccess(loginRespose);
    } catch (error) {
      toast.error((error as ApiError).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoole = async (payload: GoogleLoginResponse) => {
    try {
      setLoading(true);
      const loginRespose = await authService.loginWithGoogle({
        accessToken: payload.access_token,
      });
      await afterLoginSuccess(loginRespose);
    } catch (error) {
      toast.error((error as ApiError).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: IRegisterPayload) => {
    try {
      setLoading(true);
      await authService.register(payload);
      await clearAllSwrCache();
      refresh();
    } catch (error) {
      toast.error((error as ApiError).message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginWithPassword,
    loginWithGoole,
    register,
  };
};
