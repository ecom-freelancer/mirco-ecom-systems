import { Modal } from 'antd';
import React from 'react';
import { ImageFormConfig, ImageFormType } from './ImageConfigForm';
import { ImageElement } from '../../plugins/image/render-element';

export interface ImageConfigModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: ImageElement;
  onSave?: (data: ImageElement) => void;
  title?: string;
}

const ImageConfigModal: React.FC<ImageConfigModalProps> = ({
  open,
  onClose,
  initialData,
  onSave,
  title,
}) => {
  const onSaveForm = (data: ImageFormType) => {
    onSave?.(data as ImageElement);
    onClose();
  };
  return (
    <Modal
      onCancel={onClose}
      open={open}
      styles={{
        mask: {
          backgroundColor: 'transparent',
        },
        header: {
          paddingBottom: '0.5rem',
          borderBottom: '1px solid #f0f0f0',
        },
      }}
      footer={null}
      title={title || 'Image Config'}
      destroyOnClose
    >
      <ImageFormConfig
        initialValues={initialData}
        onCancel={onClose}
        onSave={onSaveForm}
      />
    </Modal>
  );
};

export default ImageConfigModal;
