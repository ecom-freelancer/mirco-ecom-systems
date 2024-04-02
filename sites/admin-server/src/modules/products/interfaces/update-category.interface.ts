import { SeoInfoEntity } from '@packages/nest-mysql';

export interface UpdateCategoryPayload {
  id: number;
  name: string;
  code: string;
  order?: number;
  image?: string;
  display?: boolean;
  parentId?: number;
  seoInfo?: SeoInfoEntity;
}
