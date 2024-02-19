import { PetResponseDto } from 'src/pet/dto/pet.response.dto';
import { User } from '../user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  pets: PetResponseDto[];

  static toDto(user: User): UserResponseDto {
    const { id, name, email, pets } = user;
    return {
      id,
      name,
      email,
      pets: PetResponseDto.toListDto(pets),
    } as UserResponseDto;
  }

  static toListDto(users: User[]): UserResponseDto[] {
    return users.map((user) => UserResponseDto.toDto(user));
  }
}
