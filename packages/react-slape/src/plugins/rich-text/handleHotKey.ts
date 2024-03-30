import { SlapeElement, SlapeHotKey } from '../../types';
import { Editor, Element, Transforms } from 'slate';
import { IRichLeaf } from './types';
import { RichTextElement } from './render-element';
import { RichTextElementType } from './constants';
import { message } from 'antd';

export const inlineHandler = (editor: Editor, format: keyof IRichLeaf) => {
  const marks = Editor.marks(editor);
  const isActive = marks ? marks[format] === true : false;

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const alignHandler = (
  editor: Editor,
  align: 'left' | 'center' | 'right' | 'justify',
) => {
  const { isActive } = isAlignActive(editor, align, 'align');

  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && Element.isElement(n) && false,
    split: true,
  });

  let newProperties: Partial<RichTextElement> = {
    align: isActive ? undefined : align,
  };

  // get current selection

  Transforms.setNodes<Element>(editor, newProperties as any);
};

export const isAlignActive = (editor, format, blockType = 'type') => {
  try {
    const { selection } = editor;
    if (!selection)
      return {
        isActive: false,
        match: null,
      };

    const matchs = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          n[blockType] === format,
      }),
    );

    return {
      isActive: !!matchs.length,
      match: matchs?.[0],
    };
  } catch (e) {
    return {
      isActive: true,
    };
  }
};

export const typographyHandler = (
  editor: Editor,
  type: string,
  allKeys?: Array<string>,
) => {
  try {
    const { selection } = editor;
    const matchs = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) => !Editor.isEditor(n) && Element.isElement(n),
      }),
    );

    const elements = matchs.map((e) => e[0] as SlapeElement);
    const isActive = elements?.[0]?.type === type;

    /**
     * accept only the keys that are allowed
     * and
     * element has leaf child: allChild is type = null
     */
    const childElementIsLeaf = elements.every((element) => {
      return element.children?.every((child) => {
        return !(child as SlapeElement).type;
      });
    });

    if (!childElementIsLeaf) {
      message.error('Cannot change typography of this element');
      return;
    }

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        !allKeys.includes(n['type']),
      split: true,
    });

    Transforms.setNodes<Element>(editor, {
      type: isActive ? RichTextElementType.paragraph : type,
    } as any);
  } catch (e) {
    console.log(e);
  }
};

export const richtextHotKeys: SlapeHotKey[] = [
  {
    keys: ['mod+b'],
    description: 'Bold Text',
    handler: (editor) => inlineHandler(editor, 'bold'),
  },
  {
    keys: ['mod+i'],
    description: 'Italic Text',
    handler: (e) => inlineHandler(e, 'italic'),
  },
  {
    keys: ['mod+u'],
    description: 'Underline Text',
    handler: (e) => inlineHandler(e, 'underline'),
  },
  {
    keys: ['mod+shift+s'],
    description: 'Strike Text',
    handler: (e) => inlineHandler(e, 'strikethrough'),
  },
  {
    keys: ['mod+shift+L'],
    description: 'Align Left',
    handler: (e, pluginKeys) => alignHandler(e, 'left'),
  },
  {
    keys: ['mod+shift+R'],
    description: 'Align Right',
    handler: (e, pluginKeys) => alignHandler(e, 'right'),
  },
  {
    keys: ['mod+shift+E'],
    description: 'Align Center',
    handler: (e, pluginKeys) => alignHandler(e, 'center'),
  },
  {
    keys: ['mod+shift+J'],
    description: 'Justify Text',
    handler: (e, pluginKeys) => alignHandler(e, 'justify'),
  },
  {
    keys: ['mod+shift+1'],
    description: 'Toggle H1',
    handler: (e, pluginKeys) =>
      typographyHandler(e, RichTextElementType.heading1, pluginKeys),
  },
  {
    keys: ['mod+shift+2'],
    description: 'Toggle H2',
    handler: (e, pluginKeys) =>
      typographyHandler(e, RichTextElementType.heading2, pluginKeys),
  },
  {
    keys: ['mod+shift+3'],
    description: 'Toggle H3',
    handler: (e, pluginKeys) =>
      typographyHandler(e, RichTextElementType.heading3, pluginKeys),
  },
  {
    keys: ['mod+shift+4'],
    description: 'Toggle H4',
    handler: (e, pluginKeys) =>
      typographyHandler(e, RichTextElementType.heading4, pluginKeys),
  },
  {
    keys: ['mod+shift+5'],
    description: 'Toggle H5',
    handler: (e, pluginKeys) =>
      typographyHandler(e, RichTextElementType.heading5, pluginKeys),
  },
];
