import * as dotenv from 'dotenv';

export const envLoader = () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: '.env.local',
    });
  }
};
