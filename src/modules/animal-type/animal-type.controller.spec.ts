import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTypeController } from './animal-type.controller';

describe('AnimalTypeController', () => {
  let controller: AnimalTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalTypeController],
    }).compile();

    controller = module.get<AnimalTypeController>(AnimalTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
