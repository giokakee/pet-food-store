import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnimalType } from '../../entities/animalType.entity';

@Injectable()
export class AnimalTypeService {
  constructor(
    @InjectRepository(AnimalType)
    private animalTypeRepository: Repository<AnimalType>,
  ) {}

  findAll(): Promise<AnimalType[]> {
    return this.animalTypeRepository.find({ relations: ['products'] });
  }

  findOne(id: number): Promise<AnimalType> {
    return this.animalTypeRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  create(animalType: AnimalType): Promise<AnimalType> {
    return this.animalTypeRepository.save(animalType);
  }

  async remove(id: number): Promise<void> {
    await this.animalTypeRepository.delete(id);
  }
}
