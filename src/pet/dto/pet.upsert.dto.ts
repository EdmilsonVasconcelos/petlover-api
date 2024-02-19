import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { PetType } from '../pet.type';

export class PetUpsertDto {
  id: number;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  birthDate: string;

  @IsNotEmpty()
  type: PetType | string;

  ownerId: number;
}
