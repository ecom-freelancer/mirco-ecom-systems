import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'varchar', default: '', nullable: true })
  name: string | null;
}
