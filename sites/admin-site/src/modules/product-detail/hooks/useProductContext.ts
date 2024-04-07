import { useContext } from 'react';
import { ProductDetailContext } from '../product-detail-context';

export const useProductContext = () => useContext(ProductDetailContext);
