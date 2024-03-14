import appApi from 'configs/fetchers/app-api';
import { IUser } from './types';

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
};

const mockUser: IUser = {
  id: '16e7c2c8-fefd-41b4-9710-099699a7aab0',
  displayName: 'Quản trị viên',
  email: 'admin@daiphat.vn',
  phonenumber: '0819200620',
  avatarUrl:
    'http://res.cloudinary.com/dmy6xnsql/image/upload/v1705293116/users/vwxtcstpj7joeqnocr3y.jpg',
  isVerified: true,
  createdAt: '2024-01-07T21:55:12.526Z',
};
