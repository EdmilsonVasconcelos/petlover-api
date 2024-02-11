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
import { UserUpsertDto } from './dto/user.upsert.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() user: UserUpsertDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(User.toEntity(user));
    return UserResponseDto.toDto(response);
  }

  @Put()
  async update(@Body() user: UserUpsertDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(User.toEntity(user));
    return UserResponseDto.toDto(response);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const response = await this.userService.findAll();
    return UserResponseDto.toListDto(response);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const response = await this.userService.findOne(id);
    return UserResponseDto.toDto(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
