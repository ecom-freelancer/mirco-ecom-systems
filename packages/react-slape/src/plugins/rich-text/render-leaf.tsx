import { RenderLeafProps } from 'slate-react';
import { IRichLeaf } from './types';
import { RenderLeafFunc } from '../../types';
import React from 'react';
import { useSlape } from '../../hooks/useSlape';
import { richTextPluginKey } from './constants';
import { css } from '@packages/ds-core';

export interface RenderRichTextLeafProps extends Omit<RenderLeafProps, 'leaf'> {
  leaf: IRichLeaf;
}

export const renderRichTextLeaf: RenderLeafFunc<RenderRichTextLeafProps> = (
  props,
) => {
  let { children } = props;
  const { getNextRenderLeaf } = useSlape();

  const next = getNextRenderLeaf(richTextPluginKey);

  if (props.leaf) {
    if (props.leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (props.leaf.italic) {
      children = <em>{children}</em>;
    }
    if (props.leaf.underline) {
      children = <u>{children}</u>;
    }
    if (props.leaf.strikethrough) {
      children = <s>{children}</s>;
    }
    if (props.leaf.code) {
      children = <code>{children}</code>;
    }
    if (props.leaf.color) {
      children = <span style={{ color: props.leaf.color }}>{children}</span>;
    }
  }

  return (
    next?.({ ...props, children }) || (
      <span
        className={
          props?.leaf?.text === ''
            ? css`
                padding-left: 0.1px;
              `
            : null
        }
        {...props.attributes}
      >
        {children}
      </span>
    )
  );
};
