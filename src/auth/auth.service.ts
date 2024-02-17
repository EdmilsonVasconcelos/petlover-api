import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOneByEmail(email);
    const match = await bcrypt.compare(pass, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userService.findOneByEmail(username);
  }
}
