import { ILink } from '../../components/LinkModal/LinkConfig';
import { SlapeHotKey } from '../../types';
import { Editor, Range, Transforms, Element } from 'slate';

export const inlineHotKeys: SlapeHotKey[] = [
  {
    keys: ['mod+k'],
    handler: (editor, keys, context) => {
      const { selection } = editor;
      const { emitEvent } = context;
      if (selection) {
        const value = Math.random() * 100000;
        emitEvent('hyperlink', value);
      }
    },
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

export const wrapLink = (editor, link: ILink) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const element = {
    type: 'link',
    href: link.href,
    target: link.target,
    rel: link.rel,
    children: isCollapsed
      ? [
          {
            text: link.href,
          },
        ]
      : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, element);
  } else {
    Transforms.wrapNodes(editor, element, { split: true });
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
