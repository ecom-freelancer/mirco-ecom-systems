import { useState } from 'react';
import { useErrorHandler } from '../../_shared/hooks';
import { IUpsertCategoryFormValues, IReorderCategoryPayload } from '../types';
import { categoryService } from '../services';
import { message } from 'antd';

export const useUpsertCategory = () => {
  const [loading, setLoading] = useState(false);
  const { handleActionError } = useErrorHandler();

  const upsertCategory = async (payload: IUpsertCategoryFormValues) => {
    try {
      setLoading(true);
      await categoryService.upsertCategory(payload);
      message.success(
        `${payload.id ? 'Update' : 'Create new'} category successfully.`,
      );
    } catch (e) {
      handleActionError(e);
    } finally {
      setLoading(false);
    }
  };

  const reorderCategory = async (payload: IReorderCategoryPayload) => {
    try {
      setLoading(true);
      await categoryService.reorderCategory(payload);
      message.success('Reorder category successfully');
    } catch (e) {
      handleActionError(e);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    upsertCategory,
    reorderCategory,
  };
};
