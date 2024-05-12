import { Test, TestingModule } from '@nestjs/testing';
import { FraudService } from './fraud.service';
import { DataService } from 'data/data.service';
import * as collectAndWitdrawSignals from './signals/collectAndWitdraw';
import * as instantMoneyTransferSignals from './signals/instantMoneyTransfer';
import * as irregularBehaviourSignals from './signals/irregularBehaviour';
import * as moneyAgregatorsAndCryptoSignals from './signals/moneyAgregatorsAndCrypto';
import { TransactionStatus, TransactionType, Transactions } from 'common/types/transaction';
describe('FraudService', () => {
  let service: FraudService;
  let dataService = {
    getTransactionsByCustomerId: jest.fn(async (): Promise<Transactions> => []),
    getTransactionsWithTheSameDeviceIds: jest.fn(async (): Promise<Transactions> => []),
    getTransactionsWithRelatedTransactionIds: jest.fn(async (): Promise<Transactions> => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FraudService, DataService],
    })
    .overrideProvider(DataService)
    .useValue(dataService)
    .compile();

    service = module.get<FraudService>(FraudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("Should rise an exception if no data was found", async () => {
    jest.spyOn(dataService, 'getTransactionsByCustomerId').mockImplementation(async () => []);

    let exceptionRaised = false;
    try {
      const result = await service.getTransactionsForCustomer({customerId: 5})
    } catch {
      exceptionRaised = true;
    }

    expect(exceptionRaised).toBeTruthy();
  });

  it("Should call signals with fiven transactions", async () => {
    jest.spyOn(dataService, 'getTransactionsByCustomerId').mockImplementation(async () => mockedData);
    jest.spyOn(dataService, 'getTransactionsWithRelatedTransactionIds').mockImplementation(async () => mockedData);
    const collectAndWitdrawMocked = jest.spyOn(collectAndWitdrawSignals, "collectAndWithdraw").mockReturnValueOnce([1]);
    const instantMoneyTransferMocked = jest.spyOn(instantMoneyTransferSignals, "instantMoneyTransfer").mockReturnValueOnce([1]);
    const irregularBehaviourMocked = jest.spyOn(irregularBehaviourSignals, "irregularBehaviour").mockReturnValueOnce([1]);
    const moneyAgregatorsAndCryptoMocked = jest.spyOn(moneyAgregatorsAndCryptoSignals, "moneyAgregatorsAndCrypto").mockReturnValueOnce([1]);

    await service.getTransactionsForCustomer({customerId: 5})

    expect(collectAndWitdrawMocked).toHaveBeenCalled();
    expect(collectAndWitdrawMocked).toHaveBeenCalledWith({customerTransactions:mockedData});

    expect(instantMoneyTransferMocked).toHaveBeenCalled();
    expect(instantMoneyTransferMocked).toHaveBeenCalledWith({customerTransactions:mockedData});

    expect(irregularBehaviourMocked).toHaveBeenCalled();
    expect(irregularBehaviourMocked).toHaveBeenCalledWith({customerTransactions:mockedData});

    expect(moneyAgregatorsAndCryptoMocked).toHaveBeenCalled();
    expect(moneyAgregatorsAndCryptoMocked).toHaveBeenCalledWith({customerTransactions:mockedData});
  });


});

const mockedData: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireOutgoing,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Citibank",
    "amount": 12995,
    "metadata": {
      "deviceId": "F210200"
    }
  }, {
    "transactionId": 26,
    "authorizationCode": "F20012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.Fee,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Fee for Outgoing Wire",
    "amount": 5,
    "metadata": {
      "relatedTransactionId": 25
    }
  }, {
    "transactionId": 24,
    "authorizationCode": "F10011",
    "transactionDate": "2022-09-10T13:05:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Joseph",
    "amount": 3000,
    "metadata": {
      "relatedTransactionId": 23
    }
  }, {
    "transactionId": 18,
    "authorizationCode": "F10008",
    "transactionDate": "2022-09-06T13:05:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Adam",
    "amount": 10000,
    "metadata": {
      "relatedTransactionId": 17
    }
  }
]