import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity, InjectRepository } from '@packages/nest-mysql';

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

  async create(createUserPayload: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(createUserPayload);
  }
}
