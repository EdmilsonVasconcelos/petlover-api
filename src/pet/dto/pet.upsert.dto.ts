import { IsNotEmpty, Max, Min } from 'class-validator';
import { PetType } from '../pet.type';

export class PetUpsertDto {
  id: number;

  @IsNotEmpty()
  @Min(3)
  @Max(30)
  name: string;

  @IsNotEmpty()
  @Min(1)
  @Max(30)
  birthDate: string;

  @IsNotEmpty()
  @Min(1)
  @Max(30)
  type: PetType | string;

  @IsNotEmpty()
  @Min(1)
  @Max(30)
  ownerId: number;
}
