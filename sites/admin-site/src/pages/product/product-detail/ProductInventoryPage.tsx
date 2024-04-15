import React, { useState } from 'react';
import {
  useInventoryEntityList,
  useProductSkus,
  useSkuInventoryDetail,
} from 'modules/product-detail/hooks';
import { ProductSkuInventoryList } from 'modules/product-detail/components/ProductSkuInventoryList.tsx';
import { IGetInventoryEntityListParams } from '../../../modules/product-detail/types';

const ProductInventoryPage: React.FC = () => {
  const [params, setParams] = useState<IGetInventoryEntityListParams>({
    page: 1,
    pageSize: 10,
    sku: '',
  });

  const { productSkus, loading: loadingSkus } = useProductSkus();

  const { skuInventoryDetail, isLoading: isLoadingSkuInventory } =
    useSkuInventoryDetail(params.sku);

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

  return (
    <ProductSkuInventoryList
      loading={
        loadingSkus || isLoadingSkuInventory || loadingInventoryEntityList
      }
      pageSize={params.pageSize || 0}
      totalRecord={totalRecord}
      productSkus={productSkus || []}
      selectedSku={params.sku || ''}
      skuInventoryDetail={skuInventoryDetail}
      inventoryEntityList={inventoryEntityList || []}
      onSearchInventoryEntity={onSearchInventoryEntity}
    />
  );
};

export default ProductInventoryPage;
