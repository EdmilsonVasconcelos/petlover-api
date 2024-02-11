import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserUpsertDto } from './dto/user.upsert.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Unique('email', ['email'])
  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  static toEntity(dto: UserUpsertDto): User {
    const user = new User();
    user.id = dto.id || null;
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }
}
