import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PetType } from './pet.type';
import { PetUpsertDto } from './dto/pet.upsert.dto';
import { forwardRef } from '@nestjs/common';
import { convertToDate } from 'src/utils/utils';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PetType,
    default: PetType.DOG,
  })
  type: PetType;

  @Column()
  birthDate: Date;

  @Column()
  ownerId: number;

  @ManyToOne(() => User, (user) => user.pets)
  owner: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static toEntity(petUpserDto: PetUpsertDto): Pet {
    const pet = new Pet();
    pet.id = petUpserDto.id;
    pet.name = petUpserDto.name;
    pet.birthDate = convertToDate(petUpserDto.birthDate);
    pet.type = petUpserDto.type as PetType;
    pet.ownerId = petUpserDto.ownerId;
    return pet;
  }
}
