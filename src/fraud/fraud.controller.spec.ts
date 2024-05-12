import { Test, TestingModule } from '@nestjs/testing';
import { FraudController } from './fraud.controller';
import { FraudService } from './fraud.service';
import { DataService } from 'data/data.service';

describe('FraudController', () => {
  let controller: FraudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FraudController],
      providers: [FraudService, DataService]
    }).compile();

    controller = module.get<FraudController>(FraudController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
