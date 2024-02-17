import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserUpsertDto } from './dto/user.upsert.dto';
import { UserResponseDto } from './dto/user.response.dto';
import { Public } from 'src/decorators/public.routes';
import { UserIdGuard } from 'src/guards/user.id.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async save(@Body() userUpsertDto: UserUpsertDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(
      User.toEntity(userUpsertDto),
    );
    return UserResponseDto.toDto(response);
  }

  @UseGuards(UserIdGuard)
  @Put()
  async update(@Body() userUpsertDto: UserUpsertDto): Promise<UserResponseDto> {
    const response = await this.userService.upsert(
      User.toEntity(userUpsertDto),
    );
    return UserResponseDto.toDto(response);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const response = await this.userService.findAll();
    return UserResponseDto.toListDto(response);
  }

  @UseGuards(UserIdGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const response = await this.userService.findOne(id);
    return UserResponseDto.toDto(response);
  }

  @UseGuards(UserIdGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
  }
}
