import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction";
import { instantMoneyTransfer } from "./instantMoneyTransfer";

describe("Instant money transfer signal detection", () => {
  it("Should return p2p transactions as they were made less than in a minute", () => {
    //given transaction in instant transfer mock

    const p2ptransactions = instantMoneyTransfer({customerTransactions: mockedDataInstantTranfser});

    expect(p2ptransactions.length).toBe(2);
  });

  it("Should return p2p transactions as they were made less than in a day", () => {
    //given transaction in instant transfer mock

    const p2ptransactions = instantMoneyTransfer({customerTransactions: mockedData23HoursTranfser});

    expect(p2ptransactions.length).toBe(2);
  });

  it("Should't return p2p transactions as they were made more than in a day", () => {
    //given transaction in instant transfer mock

    const p2ptransactions = instantMoneyTransfer({customerTransactions: mockedData25HoursTranfser});

    expect(p2ptransactions.length).toBe(0);
  })
});

const mockedDataInstantTranfser: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Igor",
    "amount": 2995,
    "metadata": {
      "deviceId": "F210200"
    }
  }, {
    "transactionId": 26,
    "authorizationCode": "F20012",
    "transactionDate": "2022-09-11T06:31:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Fee to Gosha",
    "amount": 2995,
    "metadata": {}
  }
];

const mockedData23HoursTranfser: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Igor",
    "amount": 2995,
    "metadata": {
      "deviceId": "F210200"
    }
  }, {
    "transactionId": 26,
    "authorizationCode": "F20012",
    "transactionDate": "2022-09-12T05:31:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Fee to Gosha",
    "amount": 2995,
    "metadata": {}
  }
]

const mockedData25HoursTranfser: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Igor",
    "amount": 2995,
    "metadata": {
      "deviceId": "F210200"
    }
  }, {
    "transactionId": 26,
    "authorizationCode": "F20012",
    "transactionDate": "2022-09-12T07:31:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Fee to Gosha",
    "amount": 2995,
    "metadata": {}
  }
]