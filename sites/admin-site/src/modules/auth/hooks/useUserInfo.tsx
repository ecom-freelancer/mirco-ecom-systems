import useSWR from 'swr';
import { IUser } from '../types';
import { authService } from '../auth-service';

export interface IUseUserInfoReturn {
  user?: IUser;
  loading: boolean;
}
export const useUserInfo = () => {
  const { data, isLoading } = useSWR('user-info', authService.getUserInfo, {});
  console.log(data, isLoading);
  return {
    user: data,
    loading: isLoading,
  };
};
