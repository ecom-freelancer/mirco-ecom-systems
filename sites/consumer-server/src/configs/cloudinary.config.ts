import { CloudinaryOptions } from '@packages/nest-file';
import { envLoader } from '@packages/nest-helper';

envLoader();
export const getCloudinaryConfig = (): CloudinaryOptions => ({
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  acceptFolders: ['images', 'videos', 'avatars'],
});
