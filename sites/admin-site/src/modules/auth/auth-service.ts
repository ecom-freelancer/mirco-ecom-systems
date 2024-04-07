import appApi from 'configs/fetchers/app-api';
import { ILoginResponse, IUser } from './types';
import { IApiResponse } from 'modules/_shared/types';
import { REFRESH_TOKEN_KEY } from 'configs/constants';

export const authService = {
  getUserInfo: () => {
    return appApi.get<IUser>('/me').then((res) => res.data);
  },

  refreshToken: async (): Promise<ILoginResponse> => {
    const accessToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    return appApi
      .get<ILoginResponse>('/refresh-token', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data);
  },
  loginWithPassword: async (
    email: string,
    password: string,
  ): Promise<ILoginResponse> => {
    return appApi
      .post<ILoginResponse>('/login', {
        email,
        password,
      })
      .then((res) => res.data);
  },

  checkPassword: async (password: string): Promise<boolean> => {
    return appApi
      .post(
        '/check-password',
        { password },
        {
          timeout: 1000,
        },
      )
      .then((res) => !!res.data)
      .catch(() => {
        return false;
      });
  },
  changePassword: async (
    oldPassword: string,
    newPassword: string,
  ): Promise<boolean> => {
    return appApi
      .post<IApiResponse<boolean>>(
        '/change-password',
        { oldPassword, newPassword },
        {
          timeout: 1000,
        },
      )
      .then((res) => res.data.data)
      .catch(() => {
        return false;
      });
  },
  logout: async () => appApi.post('/logout'),
};
