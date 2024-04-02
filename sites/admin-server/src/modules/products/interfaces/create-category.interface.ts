import { UpdateCategoryPayload } from './update-category.interface';

export interface CreateCategoryPayload
  extends Omit<UpdateCategoryPayload, 'id'> {}
