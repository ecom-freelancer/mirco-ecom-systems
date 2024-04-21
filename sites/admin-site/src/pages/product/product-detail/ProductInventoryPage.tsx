import React, { useState, useCallback } from 'react';
import {
  useInventoryEntityDetail,
  useSkuInventoryDetail,
  useSkuInventoryList,
} from 'modules/product-detail/hooks';

import useInventoryEntityList from 'modules/product-detail/hooks/useInventoryEntityList.ts';
import { ProductSkuInventoryList } from 'modules/product-detail/components/ProductSkuInventoryList';
import {
  IGetInventoryEntityListParams,
  IInventoryEntity,
  IUpsertInventoryEntityFormType,
} from 'modules/product-detail/types';
import { Button } from 'antd';
import { FloatingWrapper } from 'modules/_shared/components';
import { UpsertInventoryEntityModal } from 'modules/product-detail/containers';

const ProductInventoryPage: React.FC = () => {
  const [params, setParams] = useState<IGetInventoryEntityListParams>({
    page: 1,
    pageSize: 10,
    sku: '',
  });
  const [openUpsertModal, setOpenUpsertModal] = useState(false);
  const [editingInventoryEntity, setEditingInventoryEntity] =
    useState<IInventoryEntity | null>(null);

  const { skuInventoryList, isLoading: isLoadingSkuInventoryList } =
    useSkuInventoryList();

  const { skuInventoryDetail, isLoading: isLoadingSkuInventory } =
    useSkuInventoryDetail(params.sku);

  const {
    isUpsertingInventoryDetail,
    updateInventoryEntity,
    createInventoryEntity,
  } = useInventoryEntityDetail();

  const {
    inventoryEntityList,
    totalRecord,
    loading: loadingInventoryEntityList,
  } = useInventoryEntityList(params);

  const onSearchInventoryEntity = (
    payload: Partial<IGetInventoryEntityListParams>,
  ) => {
    setParams({ ...params, ...payload });
  };

  const handleCloseUpsertModal = () => {
    setEditingInventoryEntity(null);
    setOpenUpsertModal(false);
  };

  const handleSubmit = async (values: IUpsertInventoryEntityFormType) => {
    if (editingInventoryEntity) {
      await updateInventoryEntity(values);
    } else {
      await createInventoryEntity(values);
    }

    setOpenUpsertModal(false);
    setEditingInventoryEntity(null);

    // trigger reload
    setParams({ ...params });
  };

  const handleClickDetail = useCallback((inventoryEntity: IInventoryEntity) => {
    setEditingInventoryEntity(inventoryEntity);
    setOpenUpsertModal(true);
  }, []);

  return (
    <>
      <ProductSkuInventoryList
        loading={
          isLoadingSkuInventoryList ||
          isLoadingSkuInventory ||
          loadingInventoryEntityList
        }
        pageSize={params.pageSize || 0}
        totalRecord={totalRecord}
        selectedSkuInventoryId={params.skuInventoryId}
        skuInventoryDetail={skuInventoryDetail}
        inventoryEntityList={inventoryEntityList || []}
        onSearchInventoryEntity={onSearchInventoryEntity}
        skuInventoryList={skuInventoryList}
        onClickDetail={handleClickDetail}
      />
      <UpsertInventoryEntityModal
        open={openUpsertModal}
        title={editingInventoryEntity ? 'Edit card' : 'Add new card'}
        onClose={handleCloseUpsertModal}
        onSubmit={handleSubmit}
        skuInventoryList={skuInventoryList || []}
        loading={isUpsertingInventoryDetail}
        inventoryEntity={editingInventoryEntity}
      />
      <FloatingWrapper bottom="30px">
        <Button
          type="primary"
          size="large"
          onClick={() => setOpenUpsertModal(true)}
        >
          Add new
        </Button>
      </FloatingWrapper>
    </>
  );
};

export default ProductInventoryPage;
