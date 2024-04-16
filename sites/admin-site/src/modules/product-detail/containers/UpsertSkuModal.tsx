import { StyledModal } from 'modules/_shared/components';
import React from 'react';
import { SkuForm } from '../components';
import { IVariant } from '../types/variant';
import { IUpsertSkuFormType } from '../types/product-skus';
import { useVariants } from '../hooks';

export interface UpsertSkuModalProps {
  open: boolean;
  title?: string;
  onClose?: () => void;
  allVariants?: IVariant[];
  mode?: 'create' | 'edit';
  onSubmit?: (values: IUpsertSkuFormType) => Promise<void>;
  loading?: boolean;
  defaultValues?: IUpsertSkuFormType;
}

export const UpsertSkuModal: React.FC<UpsertSkuModalProps> = ({
  title,
  open,
  onClose,
  mode = 'create',
  onSubmit,
  loading,
  defaultValues,
}) => {
  const { variants } = useVariants();
  const submit = async (values: IUpsertSkuFormType) => {
    await onSubmit?.(values);
    onClose?.();
  };
  return (
    <StyledModal
      centered
      title={title}
      footer={null}
      destroyOnClose
      open={open}
      onCancel={onClose}
    >
      <SkuForm
        variants={variants}
        skuDisabled={mode === 'edit'}
        loading={loading}
        onSubmit={submit}
        defaultValues={defaultValues}
      />
    </StyledModal>
  );
};
