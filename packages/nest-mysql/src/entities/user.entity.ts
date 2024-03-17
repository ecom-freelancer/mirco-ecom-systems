import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  // Password can be empty when login with Google, or Facebook
  @Column({ type: 'text', nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  // Email can be empty when login with username or Facebook
  // It will be required when purchasing order
  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;
}
