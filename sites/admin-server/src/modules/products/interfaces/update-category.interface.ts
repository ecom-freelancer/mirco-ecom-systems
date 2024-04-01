export interface UpdateCategoryPayload {
  id: number;
  name: string;
  code: string;
  order?: number;
  image?: string;
  display?: boolean;
  parentId?: number;
}
