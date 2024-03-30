import { SlapePlugin } from '../../types';
import { RichTextElementType, richTextPluginKey } from './constants';
import { richtextHotKeys } from './handleHotKey';
import { renderRichTextElement } from './render-element';
import { renderRichTextLeaf } from './render-leaf';
import { withRichText } from './withRichText';

export const richtext: SlapePlugin = {
  name: richTextPluginKey,
  initialize: withRichText,
  renderLeaf: renderRichTextLeaf,
  renderELement: renderRichTextElement,
  hotKeys: richtextHotKeys,
  elementKeys: [
    RichTextElementType.heading1,
    RichTextElementType.paragraph,
    RichTextElementType.heading2,
    RichTextElementType.heading3,
    RichTextElementType.heading4,
    RichTextElementType.heading5,
  ],
};
