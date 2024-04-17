import React, { useState } from 'react';
import {
  useProductSkus,
  useSkuInventoryDetail,
} from 'modules/product-detail/hooks';

import useInventoryEntityList from 'modules/product-detail/hooks/useInventoryEntityList.ts';
import { ProductSkuInventoryList } from 'modules/product-detail/components/ProductSkuInventoryList';
import { IGetInventoryEntityListParams } from 'modules/product-detail/types';

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
      selectedSku={params.sku || null}
      skuInventoryDetail={skuInventoryDetail}
      inventoryEntityList={inventoryEntityList || []}
      onSearchInventoryEntity={onSearchInventoryEntity}
    />
  );
};

export default ProductInventoryPage;
