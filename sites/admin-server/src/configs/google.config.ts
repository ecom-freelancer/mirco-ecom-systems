import { envLoader } from '@packages/nest-helper';
import { GoogleOptions } from '@packages/nest-google';

envLoader();
export const getGoogleConfigOptions = (): GoogleOptions => {
  return {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    clientEmail: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_AUTH_PRIVATE_KEY,
  };
};
