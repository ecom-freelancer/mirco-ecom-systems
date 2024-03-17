import appApi from 'configs/fetchers/app-api';
import { ILoginResponse, IUser } from './types';
import { IApiResponse } from 'modules/_shared/types';

export const authService = {
  getUserInfo: () => {
    return appApi
      .get<IUser>('/user')
      .then((res) => res.data)
      .catch(() => {
        console.log('fetch error');
        return mockUser;
      });
  },
  loginWithPassword: async (
    email: string,
    password: string,
  ): Promise<ILoginResponse> => {
    return appApi
      .post<IApiResponse<ILoginResponse>>('/login-with-password', {
        email,
        password,
      })
      .then((res) => res.data.data)
      .catch(() => {
        return {
          idToken: 'fake',
          token: 'fake',
          user: mockUser,
        };
      });
  },

  checkPassword: async (password: string): Promise<boolean> => {
    return appApi
      .post<IApiResponse<boolean>>(
        '/check-password',
        { password },
        {
          timeout: 1000,
        },
      )
      .then((res) => res.data.data)
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
