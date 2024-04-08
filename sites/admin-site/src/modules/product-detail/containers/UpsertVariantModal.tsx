import { StyledModal } from 'modules/_shared/components';
import React from 'react';
import VariantForm from './VariantForm';
import { IVariant } from '../types.ts/variant';
import { useVariants } from '../hooks/useVariants';

export interface UpsertVariantModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  afterClose?: () => void;
  defaultValues?: IVariant;
}

export const UpsertVariantModal: React.FC<UpsertVariantModalProps> = ({
  onClose,
  open,
  title,
  afterClose,
  defaultValues,
}) => {
  const { actionLoading, upsertVariant } = useVariants();
  const onSaved = async (variant: IVariant) => {
    await upsertVariant(variant);
    onClose();
  };

  return (
    <StyledModal
      destroyOnClose
      open={open}
      onCancel={onClose}
      title={title}
      footer={null}
      afterClose={afterClose}
    >
      {open && (
        <VariantForm
          onCancel={onClose}
          onSaved={onSaved}
          loading={actionLoading}
          defaultValues={defaultValues}
        />
      )}
    </StyledModal>
  );
};
