import React from 'react';
import { RenderElementProps, SlapeElement } from '../../types';
import { InlineElementKeys, inlinePluginKey } from './constants';
import { useSlape } from '../../hooks/useSlape';
import { LinkElement } from './elements/LinkElement';

export interface InlineElement extends SlapeElement {
  type: InlineElementKeys;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  name?: string;
}

export interface RenderInlineElementProps
  extends Omit<RenderElementProps, 'element'> {
  element: RenderElementProps['element'] & InlineElement;
}

export const renderElement = (props: RenderInlineElementProps) => {
  const { getNextRenderElement } = useSlape();

  const { type, children, ...elementProps } = props.element;

  const styles = {
    ...props.styles,
  };

  switch (type) {
    case InlineElementKeys.link:
      return (
        <LinkElement attributes={props.attributes} {...(elementProps as any)}>
          {props.children}
        </LinkElement>
      );

    default:
      return (
        getNextRenderElement(inlinePluginKey)?.({ ...props, styles }) || (
          <p {...props.attributes}>{props.children}</p>
        )
      );
  }
};