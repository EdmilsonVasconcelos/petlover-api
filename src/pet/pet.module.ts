import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), forwardRef(() => UserModule)],
  providers: [PetService],
  controllers: [PetController],
  exports: [PetService],
})
export class PetModule {}
