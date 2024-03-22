import { Type } from '@nestjs/common';

export const PREFIX = 'NEST_MYSQL';
export const ENTITY_MANAGER = `${PREFIX}_ENTITY_MANAGER`;
export const CONNECTION = `${PREFIX}_CONNECTION`;
export const getRepositoryToken = (entity: Type) => `${entity.name}_REPOSITORY`;
export const DATA_SOURCE = `${PREFIX}_DATA_SOURCE`;
