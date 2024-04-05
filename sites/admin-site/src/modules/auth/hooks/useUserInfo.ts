import useSWR, { mutate as globalMutation } from 'swr';
import { ILoginResponse, IUser } from '../types';
import { authService } from '../auth-service';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'configs/constants';
import { useInterval } from 'modules/_shared/hooks/useInterval';

export interface IUseUserInfoReturn {
  user?: IUser;
  loading: boolean;
}
export const useUserInfo = () => {
  const {
    data: user,
    isLoading,
    mutate,
  } = useSWR(
    'user-info',
    () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (accessToken) {
        return authService.getUserInfo();
      }
      return undefined;
    },
    {
      revalidateOnFocus: false,
    },
  );

  const refreshToken = async () => {
    authService.refreshToken().then((response) => {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    });
  };

  useInterval(
    async () => {
      if (typeof window === 'undefined') return;
      await refreshToken();
    },
    {
      delay: 20 * 60,
      condition: !!user,
    },
  );

  const setUserLogged = (loginResponse: ILoginResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, loginResponse.refreshToken);
    mutate();
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    authService.logout();
    globalMutation(() => true, undefined, {
      revalidate: false,
    });
  };

  return {
    user: user,
    loading: isLoading,
    mutate,
    setUserLogged,
    logout,
  };
};
