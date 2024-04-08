import { ISeoInfo } from 'modules/seo-info/types';

export interface IProductSku {
  name: string;

  sku: string;

  variantId: number;

  slug: string;

  sellable?: boolean;

  sellPrice?: number;

  listPrice?: number;

  images?: string[];

  seoInfoId?: number;

  seoInfo?: ISeoInfo;
}

export type IUpsertSkuFormType = Omit<IProductSku, 'seoInfo'>;
export type IGetListSkusResponse = { items: IProductSku[] };
