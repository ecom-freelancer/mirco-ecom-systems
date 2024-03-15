import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';

import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(password, user?.password))) {
      throw new UnauthorizedException('Username or password is incorrect.');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: any): Promise<any> {
    const { username, password, name } = registerDto;
    const duplicatedUser = await this.usersService.findOne(username);

    if (duplicatedUser) {
      throw new BadRequestException('User is duplicated');
    }

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return await this.usersService.create({
      id: undefined,
      username,
      name,
      password: hashedPassword,
    });
  }
}
