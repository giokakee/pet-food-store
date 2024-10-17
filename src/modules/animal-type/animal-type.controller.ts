import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AnimalTypeService } from './animal-type.service';
import { AnimalType } from 'src/entities/animalType.entity';

@Controller('animal-types')
export class AnimalTypeController {
  constructor(private readonly animalTypeService: AnimalTypeService) {}

  @Get()
  findAll(): Promise<AnimalType[]> {
    return this.animalTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AnimalType> {
    return this.animalTypeService.findOne(+id);
  }

  @Post()
  create(@Body() animalType: AnimalType): Promise<AnimalType> {
    return this.animalTypeService.create(animalType);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.animalTypeService.remove(+id);
  }
}
