import { ProductStatus } from 'configs/constants/product';
import { IBase } from 'modules/_shared/types';
import {
  IProductAttribute,
  IProductInfoFormType,
} from 'modules/products/types';
import { ISeoInfo } from 'modules/seo-info/types';
import { IProductSku } from './product-skus';

export interface IProductDetail extends IBase {
  id: number;
  name: string;
  status: ProductStatus;
  slug: string;
  description?: string;
  userManual?: string;
  images?: string[];
  brand: string;
  categoryId: number;
  seoInfo?: ISeoInfo;
  attributes?: IProductAttribute[];
  skus?: IProductSku[];
}

export type IUpdateProductPayload = IProductInfoFormType;
