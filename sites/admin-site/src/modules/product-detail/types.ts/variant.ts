import {
  IProductAttribute,
  IProductAttributeOption,
} from 'modules/products/types';

export interface IVariant {
  id?: number;
  sku?: string;
  items?: IVariantOption[];
}

export interface IVariantOption {
  id?: number;
  attributeId?: number;
  attributeOptionId?: number;
  attribute?: IProductAttribute;
  attributeOption?: IProductAttributeOption;
}

export type IUpsertVariantPayload = IVariant;
export type IGetListVariantsResponse = { variants: IVariant[] };
