import { message } from 'antd';
import { IApiError } from '../types';

export const useErrorHandler = () => {
  const handleActionError = (e: IApiError | every, msg?: string) => {
    console.log(e);
    message.error(msg || e.message || 'Has error occurred, please try again');
  };
  return {
    handleActionError,
  };
};
