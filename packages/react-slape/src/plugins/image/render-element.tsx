import { useSelected, useFocused } from 'slate-react';
import { ImageElementType, imagePluginName } from './constants';
import React, { Suspense } from 'react';
import { useSlape } from '../../hooks/useSlape';
import { RenderElementProps, SlapeElement } from '../../types';
import { Image } from 'antd';
import { Box, Flex, styled, Text } from '@packages/ds-core';

const ImageSettings = React.lazy(
  () => import('../../components/images/ImageSettings'),
);

export interface ImageElement extends SlapeElement {
  type: ImageElementType.img;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  name?: string;
}

export interface RenderRichTextElementProps
  extends Omit<RenderElementProps, 'element'> {
  element: RenderElementProps['element'] & ImageElement;
}
export const renderImageElement = (props: RenderRichTextElementProps) => {
  const { getNextRenderElement } = useSlape();

  const selected = useSelected();
  const focused = useFocused();

  const { type, url, width, height, alt, name } = props.element;

  const styles = {
    ...props.styles,
  };

  if (type === ImageElementType.img) {
    return (
      <div
        {...props.attributes}
        style={{
          ...styles,
        }}
      >
        {props.children}
        <WrapperImage
          style={{
            display: 'inline-block',
            width: width || '100%',
          }}
        >
          <div
            contentEditable={false}
            style={{
              width: width || '100%',
              maxHeight: height,
              maxWidth: '100%',
              position: 'relative',
              display: 'inline-block',
              border: selected && focused ? '1px solid#B4D5FF' : 'none',
              boxSizing: 'border-box',
            }}
          >
            <Image
              style={{
                maxWidth: '100%',
              }}
              src={url}
              alt={alt}
              width="100%"
              height={'auto'}
              preview={false}
            />

            <Suspense>
              <ImageSettings element={props.element} showSettings={true} />
            </Suspense>
          </div>

          <Box marginTop="s2">
            <Flex justify="center">
              <Text fontSize="s" italic>
                {name}
              </Text>
            </Flex>
          </Box>
        </WrapperImage>
      </div>
    );
  }

  return (
    getNextRenderElement(imagePluginName)?.({ ...props, styles }) || (
      <p {...props.attributes}>{props.children}</p>
    )
  );
};

const WrapperImage = styled.div`
  margin: 0.25rem 0;
  max-width: 100%;
  overflow: hidden;
`;
