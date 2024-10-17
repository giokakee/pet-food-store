import { Test, TestingModule } from '@nestjs/testing';
import { AnimalTypeService } from './animal-type.service';

describe('AnimalTypeService', () => {
  let service: AnimalTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalTypeService],
    }).compile();

    service = module.get<AnimalTypeService>(AnimalTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
