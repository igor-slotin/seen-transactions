import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { DataService } from 'data/data.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let dataService = {
    getTransactionsByCustomerId: async () => Promise.resolve([])
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService, DataService],
    })
    .overrideProvider(DataService)
    .useValue(dataService)
    .compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
