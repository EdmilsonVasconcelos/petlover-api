import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async upsert(user: User): Promise<User> {
    if (!user.id) {
      await this.checkExistsUser(user.email);
    }

    if (user.id) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: ['pets'] });

    if (!users.length) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException('No users found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException(`Nenhum usuário encontrado para: ${email}`);
    }

    return user;
  }

  async checkExistsUser(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (user) {
      throw new BadRequestException('Este usuário já existe!');
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
  }
}
