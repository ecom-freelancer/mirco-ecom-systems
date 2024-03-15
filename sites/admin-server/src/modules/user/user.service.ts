import { Injectable } from '@nestjs/common';
import { InjectRepository, UserEntity } from '@packages/nest-mysql';
import { Repository } from 'typeorm';
import { CreateAccountPayloadDto } from '../auth/dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string) {
    return this.userRepository.findOneBy({
      username: username,
    });
  }

  async getUserInfo(id: string) {
    return this.userRepository.findOneBy({
      id: id,
    });
  }

  async createAccount(payload: CreateAccountPayloadDto) {
    const user = this.userRepository.create({
      name: payload.name,
      username: payload.username,
      password: payload.password,
    });
    return this.userRepository.save(user);
  }
}
