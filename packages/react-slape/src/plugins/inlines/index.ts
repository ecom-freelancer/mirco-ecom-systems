import { SlapePlugin } from '../../types';
import { inlinePluginKey } from './constants';
import { inlineHotKeys } from './handleHotKeys';
import { renderElement } from './render-element';
import { withInlines } from './withInlines';

export interface InlinePluginConfig {}

export const inlinePlugin = (): SlapePlugin => ({
  initialize: (editor) => withInlines(editor as any),
  elementKeys: ['inline'],
  renderELement: renderElement,
  hotKeys: inlineHotKeys,
  name: inlinePluginKey,
});
