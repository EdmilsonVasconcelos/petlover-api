import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async upsert(pet: Pet): Promise<Pet> {
    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    const pets = await this.petRepository.find();

    if (!pets.length) {
      throw new NotFoundException('No pets found');
    }

    return pets;
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('No pets found');
    }

    return pet;
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    await this.petRepository.delete(pet.id);
  }
}
