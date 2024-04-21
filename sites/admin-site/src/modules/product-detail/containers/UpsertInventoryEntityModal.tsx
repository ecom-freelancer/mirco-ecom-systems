import { StyledModal } from 'modules/_shared/components';
import {
  IInventoryEntity,
  ISkuInventoryDto,
  IUpsertInventoryEntityFormType,
} from '../types';
import { UpsertInventoryEntityForm } from 'modules/product-detail/components';

import { InventoryStatus } from 'configs/constants/inventory.ts';
import React from 'react';

interface UpsertInventoryEntityModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  inventoryEntity: IInventoryEntity | null;
  onSubmit: (payload: IUpsertInventoryEntityFormType) => void;
  skuInventoryList: ISkuInventoryDto[];
  loading: boolean;
}

export const UpsertInventoryEntityModal: React.FC<
  UpsertInventoryEntityModalProps
> = ({
  open,
  title,
  onClose,
  inventoryEntity,
  onSubmit,
  skuInventoryList,
  loading,
}) => {
  const defaultValues: IUpsertInventoryEntityFormType = inventoryEntity
    ? {
        id: inventoryEntity.id,
        skuInventoryId: inventoryEntity.skuInventoryId,
        barCode: inventoryEntity.barCode,
        status: inventoryEntity.status,
      }
    : {
        id: null,
        skuInventoryId: skuInventoryList?.[0]?.id || 0,
        barCode: '',
        status: InventoryStatus.draft,
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
      <UpsertInventoryEntityForm
        defaultValues={defaultValues}
        loading={loading}
        skuInventoryList={skuInventoryList}
        onCancel={onClose}
        onSubmit={onSubmit}
      />
    </StyledModal>
  );
};
