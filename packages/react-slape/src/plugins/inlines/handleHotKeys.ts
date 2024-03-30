import { SlapeHotKey } from '../../types';
import { Editor, Range, Transforms, Element } from 'slate';

export const inlineHotKeys: SlapeHotKey[] = [
  {
    keys: ['mod+k'],
    handler: (editor: any) => {},
  },
  {
    keys: ['left'],
    handler: (editor: any) => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        Transforms.move(editor, { unit: 'offset', reverse: true });
      }
    },
  },
  {
    keys: ['right'],
    handler: (editor: any) => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        Transforms.move(editor, { unit: 'offset' });
      }
    },
  },
];

export const wrapLink = (editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    href: url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n['type'] === 'link',
  });
  return !!link;
};

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n['type'] === 'link',
  });
};
