import { Test, TestingModule } from '@nestjs/testing';
import { DataService, dataUrl } from './data.service';
import axios from 'axios';

jest.mock('axios');

const axiosMock =  axios as jest.Mocked<typeof axios>;

describe('DataService', () => {
  let service: DataService;
  let axiosInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  afterEach(() => {
    axiosMock.get.mockClear();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call axios with propper url and return mocked response', async () => {
    const mockedResponse = ["value 1", "vale 2"]
    axiosMock.get.mockResolvedValue({
      data: mockedResponse,
    })

    const response = await service.getData()
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith(dataUrl);
    expect(response.toString()).toBe(mockedResponse.toString())
  });

  it('should call axios only once', async () => {
    const mockedResponse = ["value 1", "vale 2"]
    axiosMock.get.mockResolvedValue({
      data: mockedResponse,
    })

    const responseOne = await service.getData()
    const responseTwo = await service.getData()
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(dataUrl);
    expect(responseOne.toString()).toBe(responseTwo.toString())
  });

  it('should return transactions by cutomer id', async () => {
    const mockedData = [
      {
        transactionId: 1,
        customerId: 1,
      },
      {
        transactionId: 2,
        customerId: 2,
      }
    ];
    axiosMock.get.mockResolvedValue({
      data: mockedData,
    });

    const response = await service.getTransactionsByCustomerId({customerId: 1});
    expect(response.length).toBe(1);
    expect(response[0].customerId).toBe(1);
    expect(response[0].transactionId).toBe(1);
  });

  it('should return transactions with the same device id and another customer id', async () => {
    const mockedData = [
      {
        transactionId: 1,
        customerId: 1,
        metadata: {
          deviceId: "iii"
        }
      },
      {
        transactionId: 2,
        customerId: 2,
        metadata: {
          deviceId: "aaa"
        }
      },
      {
        transactionId: 3,
        customerId: 3,
        metadata: {
          deviceId: "iii"
        }
      },
    ];
    axiosMock.get.mockResolvedValue({
      data: mockedData,
    });

    const response = await service.getTransactionsWithTheSameDeviceIds({customerId: 1, deviceIds: ['iii']});
    expect(response.length).toBe(1);
    expect(response[0].customerId).toBe(3);
  });

  it ("should return transactions by related transaction from another customers", async () => {
    const mockedData = [
      {
        transactionId: 1,
        customerId: 1,
        metadata: {}
      },
      {
        transactionId: 2,
        customerId: 1,
        metadata: {
          relatedTransactionId: 1
        }
      },
      {
        transactionId: 3,
        customerId: 1,
        metadata: {}
      },
      {
        transactionId: 4,
        customerId: 2,
        metadata: {
          relatedTransactionId: 3
        }
      },
    ];
    axiosMock.get.mockResolvedValue({
      data: mockedData,
    });

    const response = await service.getTransactionsWithRelatedTransactionIds({customerId: 1, transactionIds: [3, 1]});

    expect(response.length).toBe(1);
    expect(response[0].customerId).toBe(2);
    expect(response[0].transactionId).toBe(4);
  })
});
