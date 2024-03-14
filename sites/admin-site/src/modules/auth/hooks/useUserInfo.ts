import useSWR from 'swr';
import { ILoginResponse, IUser } from '../types';
import { authService } from '../auth-service';
import { ACCESS_TOKEN_KEY, REFRSH_TOKEN_KEY } from 'configs/constants';

export interface IUseUserInfoReturn {
  user?: IUser;
  loading: boolean;
}
export const useUserInfo = () => {
  const { data, isLoading, mutate } = useSWR(
    'user-info',
    () => {
      /**
       *  get accessToken from localStorage
       */
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

  const setUserLoged = (loginResponse: ILoginResponse) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.token);
    localStorage.setItem(REFRSH_TOKEN_KEY, loginResponse.idToken);
    mutate();
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRSH_TOKEN_KEY);
    mutate();
  };

  return {
    user: data,
    loading: isLoading,
    mutate,
    setUserLoged,
    logout,
  };
};
