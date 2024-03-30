import { Flex, styled, Text } from '@packages/ds-core';
import { Popconfirm } from 'antd';
import React, { Suspense, useMemo, useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { BaseElement, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { useSlape } from '../../hooks/useSlape';
import { ImageElement } from '../../plugins/image/render-element';

const ImageConfigModal = React.lazy(
  () => import('../../components/images/ImageConfigModal'),
);

const ImageSettings: React.FC<{
  element: ImageElement;
  showSettings?: boolean;
}> = ({ element, showSettings }) => {
  const [openConfig, setOpenConfig] = useState(undefined);

  const { editor } = useSlape();

  const path = useMemo(
    () => ReactEditor.findPath(editor, element as BaseElement),
    [element],
  );

  const onRemoveImage = () => {
    Transforms.removeNodes(editor, { at: path });
  };

  const onUpdateImage = (configs: ImageElement) => {
    Transforms.setNodes<any>(
      editor,
      {
        ...element,
        ...configs,
      },
      { at: path },
    );
  };

  return (
    <React.Fragment>
      {showSettings && (
        <StyleEditorButton>
          <Flex gapX="s8">
            <Text className="icon-button" onClick={() => setOpenConfig(true)}>
              <FaPencilAlt />
            </Text>
            <Popconfirm
              title="Delete Image"
              description="Are you sure to delete this image?"
              onConfirm={onRemoveImage}
            >
              <Text className="icon-button">
                <FaTrash />
              </Text>
            </Popconfirm>
          </Flex>
        </StyleEditorButton>
      )}
      {openConfig != undefined && (
        <Suspense>
          <ImageConfigModal
            open={openConfig}
            onClose={() => setOpenConfig(false)}
            onSave={onUpdateImage}
            initialData={{
              ...element,
            }}
          />
        </Suspense>
      )}
    </React.Fragment>
  );
};

const StyleEditorButton = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;

  .icon-button {
    background-color: ${({ theme }) => theme.colors.lightA300};
    padding: 8px;
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
  }
`;

ImageSettings.displayName = 'ImageSettings';

export default ImageSettings;
