import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction";
import { irregularBehaviour } from "./irregularBehaviour";

describe("Irregular behaviour signal", () => {
  it("Should return transaction ids for p2p transactions when customer has another transactions", () => {
    const suspiciousp2ptransactionsId = irregularBehaviour({customerTransactions: mockedSuspiciousTransactions});

    expect(suspiciousp2ptransactionsId.length).toBe(1);
  });

  it("Shouldn't return transaction ids transactions when customer has no p2p transactions", () => {
    const suspiciousp2ptransactionsId = irregularBehaviour({customerTransactions: mockedNormalTransactions});

    expect(suspiciousp2ptransactionsId.length).toBe(0);
  })

  it("Shouldn't return transaction ids transactions when customer has more than one p2p transactions", () => {
    const suspiciousp2ptransactionsId = irregularBehaviour({customerTransactions: mockedNormalTransactions});

    expect(suspiciousp2ptransactionsId.length).toBe(0);
  });

  it("Should return p2p reansactions because all money from cahce deposit was transfered from the account", () => {
    // given mocked data when not all p2p money was withdrawn from the account
    const suspiciousP2PTransactions = irregularBehaviour({ customerTransactions: mockedDataP2PCache });

    expect(suspiciousP2PTransactions.length).toBe(1);
  })
})

const mockedSuspiciousTransactions: Transactions = [
  {
    "transactionId": 27,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-01T11:46:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {}
  },
  {
    "transactionId": 28,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-03T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {
      "relatedTransactionId": 27
    }
  },
  {
    "transactionId": 29,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-05T11:36:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {}
  },
  {
    "transactionId": 30,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-06T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {
      "relatedTransactionId": 29
    }
  },
  {
    "transactionId": 34,
    "authorizationCode": "F10016",
    "transactionDate": "2022-11-10T13:05:00+00:00",
    "customerId": 8,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Alice",
    "amount": 30,
    "metadata": {
      "relatedTransactionId": 9
    }
  }
];

const mockedTransactionsWithFewP2P: Transactions = [
  {
    "transactionId": 27,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-01T11:46:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {}
  },
  {
    "transactionId": 28,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-03T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {
      "relatedTransactionId": 27
    }
  },
  {
    "transactionId": 29,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-05T11:36:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {}
  },
  {
    "transactionId": 30,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-06T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {
      "relatedTransactionId": 29
    }
  },
  {
    "transactionId": 34,
    "authorizationCode": "F10016",
    "transactionDate": "2022-11-10T13:05:00+00:00",
    "customerId": 8,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Alice",
    "amount": 30,
    "metadata": {
      "relatedTransactionId": 9
    }
  },
  {
    "transactionId": 35,
    "authorizationCode": "F10016",
    "transactionDate": "2022-11-10T13:05:00+00:00",
    "customerId": 8,
    "transactionType": TransactionType.P2PRecieve,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer from Jo",
    "amount": 60,
    "metadata": {
      "relatedTransactionId": 9
    }
  }
];

const mockedNormalTransactions: Transactions = [
  {
    "transactionId": 27,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-01T11:46:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {}
  },
  {
    "transactionId": 28,
    "authorizationCode": "F10013",
    "transactionDate": "2022-10-03T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Citibank",
    "amount": 500,
    "metadata": {
      "relatedTransactionId": 27
    }
  },
  {
    "transactionId": 29,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-05T11:36:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {}
  },
  {
    "transactionId": 30,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-06T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Amazon",
    "amount": -99.99,
    "metadata": {
      "relatedTransactionId": 29
    }
  },
];

const mockedDataP2PCache: Transactions = [
  {
    "transactionId": 20,
    "authorizationCode": "F10009",
    "transactionDate": "2022-09-08T06:45:22+00:00",
    "customerId": 6,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Cash load from Venmo",
    "amount": 3000,
    "metadata": {
      "relatedTransactionId": 19
    }
  },
  {
    "transactionId": 21,
    "authorizationCode": "F10010",
    "transactionDate": "2022-09-09T11:05:00+00:00",
    "customerId": 6,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Joseph",
    "amount": -3000,
    "metadata": {
      "relatedTransactionId": 22,
      "deviceId": "F210200"
    }
  },
];