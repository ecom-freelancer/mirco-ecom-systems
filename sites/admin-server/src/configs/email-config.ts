import { TransporterConfigOptions } from '@packages/nest-mail';
import { envLoader } from './env.loader';

envLoader();

export const getEmailConfigOptions = (): TransporterConfigOptions => {
  return {
    host: process.env.NODEMAILER_TRANSPORTER_HOST,
    port: parseInt(process.env.NODEMAILER_TRANSPORTER_PORT),
    secure: !!process.env.NODEMAILER_TRANSPORTER_SECURE,
    authUser: process.env.NODEMAILER_TRANSPORTER_AUTH_USER,
    authPassword: process.env.NODEMAILER_TRANSPORTER_AUTH_PASSWORD,
  };
};
