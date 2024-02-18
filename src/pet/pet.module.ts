import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PetService],
  controllers: [PetController],
  imports: [TypeOrmModule.forFeature([Pet])],
  exports: [PetService],
})
export class PetModule {}
