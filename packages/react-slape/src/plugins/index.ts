import { fileToBase64 } from '@packages/react-helper';
import { SlapePlugin } from '../types';
import { image } from './image';
import { richtext } from './rich-text';
import { inlinePlugin } from './inlines';

export { image, richtext, inlinePlugin };

export const defaultPlugins: SlapePlugin[] = [
  richtext,
  image({
    onImageUpload: fileToBase64,
    accept: 'image/*',
  }),
  inlinePlugin(),
];
