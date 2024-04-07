import { ISeoInfo } from '../../seo-info/types.ts';

export interface ICategoryBaseInfo {
  id: number;
  name: string;
  code: string;
  display: boolean;
  parentId: number | null;
  image: string | null;
  order: number | null;
}

export interface IProductCategory extends ICategoryBaseInfo {
  seoInfo: ISeoInfo | null;
}

export interface IUpsertCategoryFormValues
  extends Omit<IProductCategory, 'id' | 'parentId'> {
  id?: number;
}

export type ICategoryBaseInfoFormValues = Omit<
  ICategoryBaseInfo,
  'parentId' | 'order' | 'image'
>;

export interface IReorderCategoryPayload {
  newOrder: { id: number; order: number }[];
}
