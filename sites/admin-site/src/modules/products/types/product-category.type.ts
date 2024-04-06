import { ISeoInfo } from '../../seo-info/types.ts';

export interface IProductCategory {
  id: number;
  name: string;
  parentId?: number;
  code: string;
  image?: string;
  display?: boolean;
  order?: number;
  seoInfo: ISeoInfo | null;
}
