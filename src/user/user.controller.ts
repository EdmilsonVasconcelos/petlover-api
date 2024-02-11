import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() user: CreateUserDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(User.toCreateUser(user));
    return UserResponseDto.toUserResponseDto(response);
  }

  @Put()
  async update(@Body() user: UpdateUserDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(User.toUpdateUser(user));
    return UserResponseDto.toUserResponseDto(response);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const response = await this.userService.findAll();
    return UserResponseDto.toListUserResponseDto(response);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const response = await this.userService.findOne(id);
    return UserResponseDto.toUserResponseDto(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
