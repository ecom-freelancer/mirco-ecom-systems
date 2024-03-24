import axios from 'axios';
import {
  accessApplicationJsonIntercepter,
  accessTokenInterceptor,
  errorInterceptor,
  responseInterceptor,
} from './interceptors';

const appApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 100000,
});

appApi.interceptors.request.use(accessApplicationJsonIntercepter);

appApi.interceptors.request.use(accessTokenInterceptor);

appApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export default appApi;
