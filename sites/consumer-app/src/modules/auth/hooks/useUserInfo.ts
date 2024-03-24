import useSWR from 'swr';
import { authService } from '../auth.service';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/configs/constants/localStrorage';
import { ILoginResponse } from '../auth.interface';
import { clearAllSwrCache } from '@/helpers/swr';
import appApi from '@/configs/fetchers/app-api';
import toast from 'react-hot-toast';

export const useUserInfo = () => {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR(
    '/user-info',
    () => {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        return authService.getMe();
      }
    },
    {
      onError: (error) => {
        if (error.response.status === 401) {
          // refresh token here
        }
      },
    },
  );

  const logout = async () => {
    try {
      await appApi.post('/logout');
    } catch (error) {
      toast.error('Failed to logout');
    }

    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    clearAllSwrCache();
    window.location.href = '/';
  };

  const setLoginResponse = (loginResponse: ILoginResponse) => {
    localStorage.setItem(ACCESS_TOKEN, loginResponse.accessToken);
    localStorage.setItem(REFRESH_TOKEN, loginResponse.refreshToken);
    mutate();
  };

  return [
    { user, isLoading },
    { mutate, setLoginResponse, logout },
  ] as const;
};
