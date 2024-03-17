import { Injectable } from '@nestjs/common';
import { InjectRepository, UserEntity } from '@packages/nest-mysql';
import { Repository } from 'typeorm';
import { CreateAccountDto } from '../auth/dtos/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserByUsername(username: string) {
    return await this.userRepository.findOneBy({
      username,
    });
  }

  async getUserById(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  async createAccount(payload: CreateAccountDto) {
    const user = this.userRepository.create({
      name: payload.name,
      username: payload.username,
      password: payload.password,
    });
    return this.userRepository.save(user);
  }

  async updateAccount(payload: UserEntity) {
    const { id, ...newData } = payload;
    return await this.userRepository.update({ id }, newData);
  }
}
