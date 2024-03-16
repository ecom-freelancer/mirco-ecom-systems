import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity, InjectRepository } from '@packages/nest-mysql';
import { RegisterDto } from '../auth/dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async createUser(createUserPayload: RegisterDto): Promise<UserEntity> {
    const { username, name, password } = createUserPayload;

    return await this.userRepository.save({
      username,
      password,
      name,
    });
  }
}
