import useSWR from 'swr';
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

  useInterval(
    () => {
      authService.refreshToken().then((response) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
      });
    },

    {
      delay: 10 * 60,
      condition: !!user,
    },
  );
  const setUserLoged = (loginResponse: ILoginResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, loginResponse.refreshToken);
    mutate();
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    mutate();
  };

  return {
    user: user,
    loading: isLoading,
    mutate,
    setUserLoged,
    logout,
  };
};
