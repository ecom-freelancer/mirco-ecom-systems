// suport type

export const richTextPluginKey = 'richtext';

export enum RichTextElementType {
  paragraph = 'paragraph',
  heading1 = 'heading1',
  heading2 = 'heading2',
  heading3 = 'heading3',
  heading4 = 'heading4',
  heading5 = 'heading5',
  quote = 'quote',
}

export type RichTextKey = keyof typeof RichTextElementType;

export enum RichTextHotkey {
  bold = 'mod+b',
  italic = 'mod+i',
  underline = 'mod+u',
  strikethrough = 'mod+shift+s',
  heading1 = 'mod+alt+1',
  heading2 = 'mod+alt+2',
  heading3 = 'mod+alt+3',
  heading4 = 'mod+alt+4',
  heading5 = 'mod+alt+5',
  quote = 'mod+shift+q',
}
