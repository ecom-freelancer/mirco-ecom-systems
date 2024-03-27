// user
export * from './user.entity';
import { UserEntity } from './user.entity';
// customer
export * from './customer.entity';
import { CustomerEntity } from './customer.entity';
// job
export * from './jobs/jobs.entity';
import { JobEntity } from './jobs/jobs.entity';

export * from './jobs/job-tasks.entity';
import { JobTasksEntity } from './jobs/job-tasks.entity';

// product
export * from './products/products.entity';
export * from './products/product-skus.entity';
export * from './products/product-categories.entity';

import { ProductEntity } from './products/products.entity';
import { ProductSkuEntity } from './products/product-skus.entity';
import { ProductCategoryEntity } from './products/product-categories.entity';

// product attributes
export * from './product-attributes/product-attributes.entity';
export * from './product-attributes/product-attribute-options.entity';
export * from './product-attributes/product-attribute-groups.entity';
export * from './product-attributes/product-attribute-group-items.entity';

import { ProductAttributeEntity } from './product-attributes/product-attributes.entity';
import { ProductAttributeOptionEntity } from './product-attributes/product-attribute-options.entity';
import { ProductAttributeGroupEntity } from './product-attributes/product-attribute-groups.entity';
import { ProductAttributeGroupItemEntity } from './product-attributes/product-attribute-group-items.entity';

// inventory
export * from './inventories/inventory-entity.entity';
export * from './inventories/sku-inventories.entity';

import { SkuInventoriesEntity } from './inventories/sku-inventories.entity';
import { InventoryEntityEntity } from './inventories/inventory-entity.entity';

// app_variables
export * from './app-variables.entity';
import { AppVariablesEntity } from './app-variables.entity';

// seo
export * from './seo-info.entity';
import { SeoInfoEntity } from './seo-info.entity';

export const entities = [
  UserEntity,
  CustomerEntity,
  JobEntity,
  JobTasksEntity,
  ProductCategoryEntity,
  ProductEntity,
  ProductSkuEntity,
  ProductAttributeEntity,
  ProductAttributeOptionEntity,
  ProductAttributeGroupEntity,
  ProductAttributeGroupItemEntity,
  InventoryEntityEntity,
  SkuInventoriesEntity,
  AppVariablesEntity,
  SeoInfoEntity,
];
