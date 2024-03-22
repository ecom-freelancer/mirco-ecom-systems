import { Inject, Type } from '@nestjs/common';
import { DATA_SOURCE, ENTITY_MANAGER, getRepositoryToken } from './constants';

export const InjectRepository = (entity: Type) =>
  Inject(getRepositoryToken(entity));

export const InjectEntityManager = () => Inject(ENTITY_MANAGER);
export const InjectDataSource = () => Inject(DATA_SOURCE);
