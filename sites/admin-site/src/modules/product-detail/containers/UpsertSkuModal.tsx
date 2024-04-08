import { StyledModal } from 'modules/_shared/components';
import React from 'react';
import { SkuForm } from './SkuForm';

export interface UpsertSkuModalProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
}

export const UpsertSkuModal: React.FC<UpsertSkuModalProps> = ({
  title,
  open,
  onClose,
}) => {
  return (
    <StyledModal
      title={title}
      footer={null}
      destroyOnClose
      open={open}
      onCancel={onClose}
    >
      <SkuForm />
    </StyledModal>
  );
};
