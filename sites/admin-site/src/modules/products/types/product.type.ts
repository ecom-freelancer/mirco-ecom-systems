import { ProductStatus } from 'configs/constants/product';
import { ISeoInfo } from 'modules/seo-info/types';

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
  seoInfo: ISeoInfo;
}

export type ICreateProductPayload = IProductInfoFormType;

export interface GetListProductParams {
  page: number;
  pageSize: number;
  startDate?: Date;
  endDate?: Date;
  categoryId?: number;
  searchText?: string;
  productStatus?: ProductStatus[];
}

// I'm too lazy to redefine the interface :)
export type IProductInfo = IProductInfoFormType;

export interface GetListProductResponse {
  totalPage: number;
  totalRecord: number;
  dataList: Array<IProductInfo>;
}
