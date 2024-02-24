import { Pet } from '../pet.entity';

export class PetResponseDto {
  id: number;
  name: string;
  birthDate: string;
  type: string;
  ownerId: number;

  static toDto(pet: Pet): PetResponseDto {
    const { id, name, birthDate, type, ownerId } = pet;
    return { id, name, birthDate: '', type, ownerId } as PetResponseDto;
  }

  static toListDto(pets: Pet[]): PetResponseDto[] {
    return pets?.map((pet) => PetResponseDto.toDto(pet));
  }
}
