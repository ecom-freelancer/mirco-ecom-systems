import { IGetInventoryEntityListParams, IInventoryEntity } from '../types';
import { productDetailService } from '../product-detail-service.ts';
import { useEffect, useState } from 'react';
import { handleActionError } from '../../_shared/helper.ts';

const useInventoryEntityList = (params: IGetInventoryEntityListParams) => {
  const [loading, setLoading] = useState(false);
  const [inventoryEntityList, setInventoryEntityList] = useState<
    IInventoryEntity[]
  >([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);

  useEffect(() => {
    const fetchInventoryEntityList = async () => {
      try {
        if (!params.skuInventoryId) {
          setInventoryEntityList([]);
          setTotalRecord(0);
          return;
        }

        setLoading(true);
        const response = await productDetailService.getInventoryEntityList(
          params,
        );
        setInventoryEntityList(response.dataList);
        setTotalRecord(response.totalRecord);
      } catch (e) {
        handleActionError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryEntityList().then();
  }, [params]);

  return {
    loading,
    inventoryEntityList,
    totalRecord,
  };
};

export default useInventoryEntityList;
