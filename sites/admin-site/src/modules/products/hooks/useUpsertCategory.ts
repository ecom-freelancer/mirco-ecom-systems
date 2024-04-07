import { useState } from 'react';
import { useErrorHandler } from '../../_shared/hooks';
import { IUpsertCategoryFormValues } from '../types';

export const useUpsertCategory = () => {
  const [loading, setLoading] = useState(false);
  const { handleActionError } = useErrorHandler();

  const upsertCategory = async (payload: IUpsertCategoryFormValues) => {
    try {
      setLoading(true);
      console.log(payload);
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
