import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction";
import { collectAndWithdraw } from "./collectAndWitdraw";

describe("Collect and withdraw signal detection", () => {
  it("Should return p2p transactions when customer collect money via p2p and then withdraw them", () => {
    // given mocked suspicious data when all p2p money was withdrawn from the account
    const suspiciousP2PTransactions = collectAndWithdraw({ customerTransactions: mockedSuspicousDataAllMoneyWitdraw });

    expect(suspiciousP2PTransactions.length).toBe(2);
  })

  it("Shouldn't return p2p reansactions because not all money was withdrawn from the account", () => {
    // given mocked data when not all p2p money was withdrawn from the account
    const suspiciousP2PTransactions = collectAndWithdraw({ customerTransactions: mockedDataNotAllMoneyWitdraw });

    expect(suspiciousP2PTransactions.length).toBe(0);
  })
  // it("Shouldn't return p2p reansactions because not all moneq was withdrawn from the account", () => {
  //   // given mocked data when not all p2p money was withdrawn from the account
  //   const suspiciousP2PTransactions = collectAndWithdraw({ customerTransactions: mockedDataAllP2PMoneyWitdraw });

  //   expect(suspiciousP2PTransactions.length).toBe(0);
  // });

  // it("Should return p2p reansactions because all moneq was withdrawn from the account and ach income was returned", () => {
  //   // given mocked data when not all p2p money was withdrawn from the account
  //   const suspiciousP2PTransactions = collectAndWithdraw({ customerTransactions: mockedDataAllP2PMoneyWitdrawAndAchReturned });

  //   expect(suspiciousP2PTransactions.length).toBe(2);
  // })
})

// Mocked data
const mockedSuspicousDataAllMoneyWitdraw: Transactions = [
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

const mockedDataNotAllMoneyWitdraw: Transactions = [
  {
    "transactionId": 25,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireOutgoing,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Citibank",
    "amount": 2995,
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

// const mockedDataAllP2PMoneyWitdraw: Transactions = [
//   {
//     "transactionId": 19,
//     "authorizationCode": "F10009",
//     "transactionDate": "2022-09-07T05:31:32+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.AchIncoming,
//     "transactionStatus": TransactionStatus.Pendting,
//     "description": "Cash load from Venmo",
//     "amount": 3000,
//     "metadata": {}
//   },
//   {
//     "transactionId": 20,
//     "authorizationCode": "F10009",
//     "transactionDate": "2022-09-08T06:45:22+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.AchIncoming,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Cash load from Venmo",
//     "amount": 3000,
//     "metadata": {
//       "relatedTransactionId": 19
//     }
//   },
//   {
//     "transactionId": 25,
//     "authorizationCode": "F10012",
//     "transactionDate": "2022-09-11T06:30:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.WireOutgoing,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer to Citibank",
//     "amount": 12995,
//     "metadata": {
//       "deviceId": "F210200"
//     }
//   }, {
//     "transactionId": 26,
//     "authorizationCode": "F20012",
//     "transactionDate": "2022-09-11T06:30:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.Fee,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Fee for Outgoing Wire",
//     "amount": 5,
//     "metadata": {
//       "relatedTransactionId": 25
//     }
//   }, {
//     "transactionId": 24,
//     "authorizationCode": "F10011",
//     "transactionDate": "2022-09-10T13:05:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.P2PRecieve,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer from Joseph",
//     "amount": 3000,
//     "metadata": {
//       "relatedTransactionId": 23
//     }
//   }, {
//     "transactionId": 18,
//     "authorizationCode": "F10008",
//     "transactionDate": "2022-09-06T13:05:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.P2PRecieve,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer from Adam",
//     "amount": 10000,
//     "metadata": {
//       "relatedTransactionId": 17
//     }
//   }
// ];

// const mockedDataAllP2PMoneyWitdrawAndAchReturned: Transactions = [
//   {
//     "transactionId": 19,
//     "authorizationCode": "F10009",
//     "transactionDate": "2022-09-07T05:31:32+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.AchIncoming,
//     "transactionStatus": TransactionStatus.Pendting,
//     "description": "Cash load from Venmo",
//     "amount": 3000,
//     "metadata": {}
//   },
//   {
//     "transactionId": 20,
//     "authorizationCode": "F10009",
//     "transactionDate": "2022-09-08T06:45:22+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.AchIncoming,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Cash load from Venmo",
//     "amount": 3000,
//     "metadata": {
//       "relatedTransactionId": 19
//     }
//   },
//   {
//     "transactionId": 31,
//     "authorizationCode": "F10009",
//     "transactionDate": "2022-09-08T06:45:22+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.AchIncoming,
//     "transactionStatus": TransactionStatus.Returned,
//     "description": "Cash load from Venmo",
//     "amount": -3000,
//     "metadata": {
//       "relatedTransactionId": 20
//     }
//   },
//   {
//     "transactionId": 25,
//     "authorizationCode": "F10012",
//     "transactionDate": "2022-09-11T06:30:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.WireOutgoing,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer to Citibank",
//     "amount": 12995,
//     "metadata": {
//       "deviceId": "F210200"
//     }
//   }, {
//     "transactionId": 26,
//     "authorizationCode": "F20012",
//     "transactionDate": "2022-09-11T06:30:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.Fee,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Fee for Outgoing Wire",
//     "amount": 5,
//     "metadata": {
//       "relatedTransactionId": 25
//     }
//   }, {
//     "transactionId": 24,
//     "authorizationCode": "F10011",
//     "transactionDate": "2022-09-10T13:05:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.P2PRecieve,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer from Joseph",
//     "amount": 3000,
//     "metadata": {
//       "relatedTransactionId": 23
//     }
//   }, {
//     "transactionId": 18,
//     "authorizationCode": "F10008",
//     "transactionDate": "2022-09-06T13:05:00+00:00",
//     "customerId": 5,
//     "transactionType": TransactionType.P2PRecieve,
//     "transactionStatus": TransactionStatus.Settled,
//     "description": "Transfer from Adam",
//     "amount": 10000,
//     "metadata": {
//       "relatedTransactionId": 17
//     }
//   }
// ]