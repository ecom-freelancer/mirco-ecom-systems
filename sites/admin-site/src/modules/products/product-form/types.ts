import { ProductStatus } from 'configs/constants/product';

export interface IProductBaseInfo {
  title?: string;
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
}

export interface IProductAttributeOption {
  id?: number;
  order?: number;
  name?: string;
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

export interface IProductCategory {
  id: number;
  name: string;
  parentId?: number;
}
