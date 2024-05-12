import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction"
import { getDeviceIds } from "./getDeviceIds"

describe("Get device ids", () => {
  it("Should return device ids for transactions with present device id", () => {
    const deviceIds = getDeviceIds({transactions: mockedDataWithDeviceId});

    expect(deviceIds.length).toBe(2);
  });

  it("Shouldn't return device ids for transactions without present device id", () => {
    const deviceIds = getDeviceIds({transactions: mockedDataWithoutDeviceId});

    expect(deviceIds.length).toBe(0);
  })
})

const mockedDataWithDeviceId: Transactions = [
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
  },
  {
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
  },
  {
    "transactionId": 23,
    "authorizationCode": "F10011",
    "transactionDate": "2022-09-10T13:05:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Weoy",
    "amount": -3000,
    "metadata": {
      "relatedTransactionId": 24,
      "deviceId": "F210200"
    }
  },
];

const mockedDataWithoutDeviceId: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireOutgoing,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Citibank",
    "amount": 12995,
    "metadata": {}
  },
  {
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
  },
  {
    "transactionId": 23,
    "authorizationCode": "F10011",
    "transactionDate": "2022-09-10T13:05:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Weoy",
    "amount": -3000,
    "metadata": {
      "relatedTransactionId": 24,
    }
  },
]