import axios from 'axios';
import {
  accessApplicationJsonInterceptor,
  accessTokenInterceptor,
  errorInterceptor,
  responseInterceptor,
} from './interceptors';

const appApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '',
  timeout: 100000,
});

appApi.interceptors.request.use(accessApplicationJsonInterceptor);

appApi.interceptors.request.use(accessTokenInterceptor);

appApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export default appApi;
