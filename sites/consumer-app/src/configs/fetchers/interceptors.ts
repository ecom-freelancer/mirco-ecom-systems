import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IApiError } from './fetcher.interface';
import { ACCESS_TOKEN } from '../constants/localStrorage';

export const accessTokenInterceptor = (request: InternalAxiosRequestConfig) => {
  if (typeof window == undefined) return request;

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
};

export const accessApplicationJsonIntercepter = (
  request: InternalAxiosRequestConfig,
) => {
  request.headers['Content-Type'] = 'application/json';
  return request;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

export const errorInterceptor = (error: AxiosError) => {
  throw {
    ...(error.response?.data || {}),
    message:
      (error?.response?.data as any)?.message ||
      error.message ||
      'An error occurred. Please try again later.',
  } as IApiError;
};
