import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name?: string;
}
