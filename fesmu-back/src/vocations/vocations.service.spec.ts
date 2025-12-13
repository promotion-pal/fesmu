import { Test, TestingModule } from '@nestjs/testing';
import { VocationsService } from './vocations.service';

describe('VocationsService', () => {
  let service: VocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocationsService],
    }).compile();

    service = module.get<VocationsService>(VocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
