import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { DataService } from 'data/data.service';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;
  let dataService = {
    getTransactionsByCustomerId: async () => Promise.resolve([])
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService, DataService]
    })
    .overrideProvider(DataService)
    .useValue(dataService)
    .compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
