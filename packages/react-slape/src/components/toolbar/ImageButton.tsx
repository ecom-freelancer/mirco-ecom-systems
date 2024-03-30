import { styled } from '@packages/ds-core';
import { Tooltip } from 'antd';
import React, { Suspense } from 'react';
import { FaImage } from 'react-icons/fa';
import { Transforms } from 'slate';
import { useSlape } from '../../hooks/useSlape';
import { ImageElement } from '../../plugins/image/render-element';
import { ImageElementType } from '../../plugins/image/constants';

const ImageConfigModal = React.lazy(() => import('../images/ImageConfigModal'));

export const ImageButton = () => {
  const [open, setOpen] = React.useState(undefined);
  const { editor } = useSlape();

  const onSave = (element: ImageElement) => {
    const text = { text: '' };
    const image: ImageElement = {
      type: ImageElementType.img,
      url: element.url,
      alt: element.alt,
      width: element.width ?? 500,
      height: element.height,
      name: element.name,
      align: 'center',
      children: [text],
    };
    Transforms.insertNodes(editor, image as any);
  };

  return (
    <React.Fragment>
      <Tooltip title="Upload image">
        <IconButton onClick={() => setOpen(true)}>
          <FaImage />
        </IconButton>
      </Tooltip>
      {open !== undefined && (
        <Suspense fallback={null}>
          <ImageConfigModal
            onSave={onSave}
            open={open}
            onClose={() => setOpen(false)}
            title="Upload Image"
          />
        </Suspense>
      )}
    </React.Fragment>
  );
};
const IconButton = styled.div`
  font-size: 20px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  cursor: pointer;
`;
