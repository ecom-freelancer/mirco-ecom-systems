import { useState } from 'react';
import { useErrorHandler } from '../../_shared/hooks';
import { IUpsertCategoryFormValues } from '../types';
import { categoryService } from '../services';
import { message } from 'antd';

export const useUpsertCategory = () => {
  const [loading, setLoading] = useState(false);
  const { handleActionError } = useErrorHandler();

  const upsertCategory = async (payload: IUpsertCategoryFormValues) => {
    try {
      setLoading(true);
      console.log(payload);
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

  return {
    loading,
    upsertCategory,
  };
};
