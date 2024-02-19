import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PetService } from './pet.service';
import { Pet } from './pet.entity';
import { PetUpsertDto } from './dto/pet.upsert.dto';
import { UserIdGuard } from 'src/guards/user.id.guard';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Get()
  async findAll() {
    return this.petService.findAll();
  }

  @UseGuards(UserIdGuard)
  @Get(':id')
  async findOne(id: number) {
    return this.petService.findOne(id);
  }

  @UseGuards(UserIdGuard)
  @Get('remove/:id')
  async remove(id: number) {
    return this.petService.remove(id);
  }

  @UseGuards(UserIdGuard)
  @Post()
  async upsert(
    @Body() petUpsertDto: PetUpsertDto,
    @Headers('ownerId') ownerId: number,
  ): Promise<Pet> {
    petUpsertDto.ownerId = ownerId;
    return this.petService.upsert(Pet.toEntity(petUpsertDto));
  }

  @UseGuards(UserIdGuard)
  @Put()
  async update(@Body() petUpsertDto: PetUpsertDto) {
    return this.petService.upsert(Pet.toEntity(petUpsertDto));
  }
}
