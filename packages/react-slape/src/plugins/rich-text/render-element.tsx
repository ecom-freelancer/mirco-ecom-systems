import React from 'react';
import { RenderElementFunc, RenderElementProps } from '../../types';
import {
  RichTextElementType,
  RichTextKey,
  richTextPluginKey,
} from './constants';
import { useSlape } from '../../hooks/useSlape';
import { Paragraph } from '../../components/elements/paragraph';

export interface RichTextElement {
  type: RichTextKey;
  align?: 'left' | 'center' | 'right' | 'justify';
}
export interface RenderRichTextElementProps
  extends Omit<RenderElementProps, 'element'> {
  element: RenderElementProps['element'] & RichTextElement;
}

export const renderRichTextElement: RenderElementFunc<
  RenderRichTextElementProps
> = (props) => {
  const { getNextRenderElement } = useSlape();

  const elementStyles: React.CSSProperties = {
    ...props.styles,
    textAlign: props.element.align,
  };

  if (!!RichTextElementType[props.element.type]) {
    switch (props.element.type) {
      case RichTextElementType.heading1:
        return (
          <h1 {...props.attributes} style={elementStyles}>
            {props.children}
          </h1>
        );
      case RichTextElementType.heading2:
        return (
          <h2 {...props.attributes} style={elementStyles}>
            {props.children}
          </h2>
        );
      case RichTextElementType.heading3:
        return (
          <h3 {...props.attributes} style={elementStyles}>
            {props.children}
          </h3>
        );
      case RichTextElementType.heading4:
        return (
          <h4 {...props.attributes} style={elementStyles}>
            {props.children}
          </h4>
        );
      case RichTextElementType.heading5:
        return (
          <h5 {...props.attributes} style={elementStyles}>
            {props.children}
          </h5>
        );
      case RichTextElementType.quote:
        return (
          <blockquote {...props.attributes} style={elementStyles}>
            {props.children}
          </blockquote>
        );
      case RichTextElementType.paragraph:
        return (
          <Paragraph {...props.attributes} style={elementStyles}>
            {props.children}
          </Paragraph>
        );
    }
  }

  return (
    getNextRenderElement(richTextPluginKey)?.({
      ...props,
      styles: elementStyles,
    }) || (
      <Paragraph {...props.attributes} style={elementStyles}>
        {props.children}
      </Paragraph>
    )
  );
};
