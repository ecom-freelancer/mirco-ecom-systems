import { SlapePlugin } from '../../types';
import { ImageElementType, imagePluginName } from './constants';
import { renderImageElement } from './render-element';
import { ImagePluginConfig, withImage } from './withImage';

export interface ImagePlugin extends SlapePlugin {
  configs?: ImagePluginConfig;
}

export const image = (configs: ImagePluginConfig): ImagePlugin => {
  return {
    name: imagePluginName,
    initialize: (editor) => {
      return withImage(editor as any, configs);
    },
    elementKeys: [ImageElementType.img],
    renderELement: renderImageElement,
    configs: configs,
  };
};
