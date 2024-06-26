import React from 'react';
import { RenderElementProps, SlapeElement } from '../../types';
import { InlineElementKeys, inlinePluginKey } from './constants';
import { useSlape } from '../../hooks/useSlape';
import { LinkElement } from './elements/LinkElement';
import { Paragraph } from '../../components/elements/paragraph';

export interface InlineElement extends SlapeElement {
  type: InlineElementKeys;
  href: string;
  alt?: string;
  rel?: string;
  target?: string;
}

export interface RenderInlineElementProps
  extends Omit<RenderElementProps, 'element'> {
  element: RenderElementProps['element'] & InlineElement;
}

export const renderElement = (props: RenderInlineElementProps) => {
  const { getNextRenderElement } = useSlape();

  const { type } = props.element;

  const styles = {
    ...props.styles,
  };

  switch (type) {
    case InlineElementKeys.link:
      return (
        <LinkElement attributes={props.attributes} element={props.element}>
          {props.children}
        </LinkElement>
      );

    default:
      return (
        getNextRenderElement(inlinePluginKey)?.({ ...props, styles }) || (
          <Paragraph {...props.attributes}>{props.children}</Paragraph>
        )
      );
  }
};
