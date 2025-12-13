import { Test, TestingModule } from '@nestjs/testing';
import { VocationsController } from './vocations.controller';
import { VocationsService } from './vocations.service';

describe('VocationsController', () => {
  let controller: VocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocationsController],
      providers: [VocationsService],
    }).compile();

    controller = module.get<VocationsController>(VocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
