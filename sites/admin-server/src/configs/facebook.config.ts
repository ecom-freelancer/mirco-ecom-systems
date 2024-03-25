import { envLoader } from '@packages/nest-helper';
import { FacebookOptions } from '@packages/nest-facebook';

envLoader();
export const getFacebookConfigOptions = (): FacebookOptions => {
  return {
    clientId: process.env.FACEBOOK_AUTH_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET,
    callbackUrl: 'http://localhost:3000/api/facebook-redirect',
  };
};
