import appApi from '@/configs/fetchers/app-api';
import {
  ILoginResponse,
  ILoginWithPasswordPayload,
  IRegisterPayload,
  IUser,
} from './auth.interface';
import { REFRESH_TOKEN } from '@/configs/constants/localStrorage';

export const authService = {
  loginWithPassword: async (payload: ILoginWithPasswordPayload) => {
    return appApi
      .post<ILoginResponse>('/login', payload)
      .then((res) => res.data);
  },

  register: async (payload: IRegisterPayload) => {
    return appApi.post('/register', payload).then((res) => res.data);
  },

  getMe: () => appApi.get<IUser>('/me').then((res) => res.data),

  logout: async () => appApi.post('/logout'),

  refreshToken: async () => {
    if (!localStorage.getItem(REFRESH_TOKEN)) {
      return;
    }
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return appApi
      .get<ILoginResponse>('/refresh-token', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => res.data);
  },
};
