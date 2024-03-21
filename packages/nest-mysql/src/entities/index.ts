import { UserEntity } from './user.entity';
import { CustomerEntity } from './customer.entity';

export * from './user.entity';
export * from './customer.entity';

export const entities = [UserEntity, CustomerEntity];
