import { IProductCategory } from '@/modules/category/types';
import React from 'react';
import { AppHeader } from '../components';

export const revalidate = 4;

const getCategories = async (): Promise<IProductCategory[]> => {
  /**
   * moack call api to get categories
   */
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('get categories');
      resolve([
        {
          slug: 'category-1',
          title: 'All categories',
        },
        {
          slug: 'category-2',
          title: 'Computers And Accessories',
        },
        {
          slug: 'cell-phones',
          title: 'Cell Phones & Accessories',
        },
        {
          slug: 'electronics',
          title: 'Electronics',
        },
      ]);
    }, 10);
  });
};

const Header = async () => {
  const categories = await getCategories();
  /**
   * console log here will not be display on browser console
   */
  return <AppHeader categories={categories} />;
};

export default Header;
