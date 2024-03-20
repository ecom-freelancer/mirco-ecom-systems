import appApi from 'configs/fetchers/app-api';
import { ILoginResponse, IUser } from './types';
import { IApiResponse } from 'modules/_shared/types';
import { REFRESH_TOKEN_KEY } from 'configs/constants';

export const authService = {
  getUserInfo: () => {
    return appApi
      .get<IUser>('/me')
      .then((res) => res.data)
      .catch(() => {
        console.log('fetch error');
        return mockUser;
      });
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

const mockUser: IUser = {
  id: '16e7c2c8-fefd-41b4-9710-099699a7aab0',
  firstName: 'Quan',
  lastName: 'Tri vien',
  email: 'admin@daiphat.vn',
  phonenumber: '0819200620',
  avatarUrl:
    'http://res.cloudinary.com/dmy6xnsql/image/upload/v1705293116/users/vwxtcstpj7joeqnocr3y.jpg',
  isVerified: true,
  createdAt: '2024-01-07T21:55:12.526Z',
};
