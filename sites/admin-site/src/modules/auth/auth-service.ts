import appApi from 'configs/fetchers/app-api';
import { IUser } from './types';

export const authService = {
  getUserInfo: () => {
    return appApi
      .get<IUser>('/api/user')
      .then((res) => res.data)
      .catch(() => {
        return {
          id: 0,
          name: 'Guest',
          email: '',
        } as IUser;
      });
  },
};
