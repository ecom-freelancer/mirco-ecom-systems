import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum AppVariableType {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  json = 'json',
  array = 'array',
}

@Entity('app_variables')
export class AppVariablesEntity {
  @PrimaryColumn('varchar')
  key: string;

  @Column({
    type: 'nvarchar',
    length: 255,
  })
  title: string;

  @Column({
    enum: AppVariableType,
    type: 'enum',
    default: AppVariableType.string,
  })
  type: AppVariableType;

  @Column({
    type: 'text',
  })
  value: string;
}
