import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IApiError } from 'modules/_shared/types';

export const accessTokenInterceptor = (request: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && request.headers['Authorization'] === undefined) {
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
  } as IApiError;
};
