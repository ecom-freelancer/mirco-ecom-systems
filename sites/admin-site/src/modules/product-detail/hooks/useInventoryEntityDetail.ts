import { useCallback, useState } from 'react';
import {
  ICreateInventoryEntityPayload,
  IUpdateInventoryEntityPayload,
} from '../types';
import { productDetailService } from '../product-detail-service.ts';
import {
  handleActionError,
  handleActionSuccess,
} from '../../_shared/helper.ts';

export const useInventoryEntityDetail = () => {
  const [loading, setLoading] = useState(false);

  const createInventoryEntity = useCallback(
    async (payload: ICreateInventoryEntityPayload) => {
      try {
        setLoading(true);
        await productDetailService.createInventoryEntity(payload);
        handleActionSuccess('Create Inventory Entity success');
      } catch (e) {
        handleActionError(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateInventoryEntity = useCallback(
    async (payload: IUpdateInventoryEntityPayload) => {
      try {
        setLoading(true);
        await productDetailService.updateInventoryEntity(payload);
        handleActionSuccess('Update Inventory Entity success');
      } catch (e) {
        handleActionError(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    isUpsertingInventoryDetail: loading,
    createInventoryEntity,
    updateInventoryEntity,
  };
};
