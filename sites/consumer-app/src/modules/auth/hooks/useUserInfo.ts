import useSWR from 'swr';
import { authService } from '../auth.service';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/configs/constants/localStrorage';
import { ILoginResponse } from '../auth.interface';
import { clearAllSwrCache } from '@/helpers/swr';
import appApi from '@/configs/fetchers/app-api';
import toast from 'react-hot-toast';
import { useInterval } from '@packages/react-helper';
import { IApiError } from '@/configs/fetchers/fetcher.interface';

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
        if ((error as IApiError).status === 401) {
          refreshToken();
        }
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    },
  );

  const refreshToken = () =>
    authService.refreshToken().then((response) => {
      localStorage.setItem(ACCESS_TOKEN, response?.accessToken);
      localStorage.setItem(REFRESH_TOKEN, response?.refreshToken);
      mutate();
    });

  useInterval(
    () => {
      if (typeof window === 'undefined') return;
      refreshToken();
    },

    {
      delay: 10 * 60,
      condition: !!user,
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
