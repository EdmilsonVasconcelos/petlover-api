import { User } from '../user.entity';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;

  static toUserResponseDto(user: User): UserResponseDto {
    const { id, name, email } = user;
    return { id, name, email } as UserResponseDto;
  }

  static toListUserResponseDto(users: User[]): UserResponseDto[] {
    return users.map((user) => UserResponseDto.toUserResponseDto(user));
  }
}
