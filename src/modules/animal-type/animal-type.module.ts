import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypeService } from './animal-type.service';
import { AnimalTypeController } from './animal-type.controller';
import { AnimalType } from 'src/entities/animalType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalType])],
  providers: [AnimalTypeService],
  controllers: [AnimalTypeController],
})
export class AnimalTypeModule {}
