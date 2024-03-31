import { BaseElement, Editor, Transforms, Element } from 'slate';
import { ReactEditor } from 'slate-react';
import { SlapeElement } from '../../types';
import { ImageElement } from './render-element';
import { ImageElementType } from './constants';
import { HistoryEditor } from 'slate-history';

export interface ImagePluginConfig {
  onImageUpload?: (file: File) => Promise<string>;
  accept?: string;
}

export const withImage = (
  editor: ReactEditor & HistoryEditor,
  configs: ImagePluginConfig,
): Editor => {
  const onUploadImage = configs.onImageUpload;
  const { insertData, isVoid, insertBreak } = editor;

  const insertImage = (editor, url) => {
    const text = { text: '' };
    const image: ImageElement = {
      type: ImageElementType.img,
      url: url,
      align: 'center',
      width: 500,
      children: [text],
    };
    Transforms.insertNodes(editor, image as any);
  };

  editor.isVoid = (element: SlapeElement) => {
    return element.type === ImageElementType.img
      ? true
      : isVoid(element as BaseElement);
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          onUploadImage(file).then((url) => {
            insertImage(editor, url);
          });
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  editor.insertBreak = () => {
    const { selection } = editor;
    if (selection) {
      const matches = Array.from(
        Editor.nodes(editor, {
          at: Editor.unhangRange(editor, selection),
          match: (n) =>
            !Editor.isEditor(n) &&
            Element.isElement(n) &&
            n['type'] === ImageElementType.img,
        }),
      );
      const element = matches?.[0]?.[0] as ImageElement;

      if (element) {
        Transforms.insertNodes(editor, {
          type: 'paragraph',
          children: [{ text: '' }],
        } as any);
        return;
      }
    }
    insertBreak();
  };

  return editor;
};

const isImageUrl = (url) => {
  if (!url) return false;
  // regex
  if (!url.match(/^https?:\/\/.+/g)) return false;
};
