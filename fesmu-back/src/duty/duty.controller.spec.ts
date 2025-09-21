import { Test, TestingModule } from '@nestjs/testing';
import { DutyController } from './duty.controller';
import { DutyService } from './duty.service';

describe('DutyController', () => {
  let controller: DutyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DutyController],
      providers: [DutyService],
    }).compile();

    controller = module.get<DutyController>(DutyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
