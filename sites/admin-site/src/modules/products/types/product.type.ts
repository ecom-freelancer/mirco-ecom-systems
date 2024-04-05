import { ProductStatus } from 'configs/constants/product';

export interface IProductBaseInfo {
  name?: string;
  slug?: string;
  brand?: string;
  categoryId?: string;
  description?: string;
  images?: Array<string>;
  userManual?: string;
}

export interface IProductAdvanceInfo {
  status: ProductStatus;
  deliveryType?: string;
  keywords?: Array<string>;
}

export interface IProductAttribute {
  id?: number;
  name?: string;
  order?: number;
  showNameInConsumer?: boolean;
  options?: Array<IProductAttributeOption>;
  uniqCode?: string;
}

export interface IProductAttributeOption {
  id?: number;
  order?: number;
  name?: string;
  uniqCode?: string;
}

export interface IVariantAttribute {
  id?: number;
  attributeId?: number;
  attributeOptionId?: number;
}

export interface IVariants {
  id?: number;
  sku?: string;
  items?: Array<IVariantAttribute>;
}

export interface IProductInfoFormType
  extends IProductAdvanceInfo,
    IProductBaseInfo {
  id: number;
  attributes: Array<IProductAttribute>;
  variants: Array<IVariants>;
}

export type ICreateProductPayload = IProductInfoFormType;
