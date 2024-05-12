import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction"
import { groupTransactionsByAuthCode } from "./groupTransactionsByAuthCode"
import { groupedTransactionsSorter } from "./groupedTransactionsSorter"

describe("Grouped transactions soreter", () => {
  it("Should sort transactions inside and transactions object should have propper structure", () => {
    const groupedSoretedTransactions = groupedTransactionsSorter({
      groupedTransactions: groupTransactionsByAuthCode({transactions: mockedData})
    });

    expect(groupedSoretedTransactions[0].timeline.length).toBe(2);
    expect(groupedSoretedTransactions[0].timeline[0].status).toBe(TransactionStatus.Pendting);
    expect(groupedSoretedTransactions[0].timeline[1].status).toBe(TransactionStatus.Settled);
    expect(groupedSoretedTransactions[1].timeline[0].status).toBe(TransactionStatus.Pendting);
    expect(groupedSoretedTransactions[1].timeline[1].status).toBe(TransactionStatus.Settled);
    expect(groupedSoretedTransactions[1].timeline[2].status).toBe(TransactionStatus.Returned);
  })
})

const mockedData: Transactions = [
  {
    "transactionId": 1,
    "authorizationCode": "F10000",
    "transactionDate": "2022-09-01T11:46:42+00:00",
    "customerId": 1,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Deposit from Citibank",
    "amount": 5000,
    "metadata": {}
  },
  {
    "transactionId": 2,
    "authorizationCode": "F10000",
    "transactionDate": "2022-09-03T15:41:42+00:00",
    "customerId": 1,
    "transactionType": TransactionType.AchIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Citibank",
    "amount": 5000,
    "metadata": {
      "relatedTransactionId": 1
    }
  },
  {
    "transactionId": 3,
    "authorizationCode": "F10001",
    "transactionDate": "2022-09-05T11:36:42+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Amazon",
    "amount": -143.21,
    "metadata": {}
  },
  {
    "transactionId": 4,
    "authorizationCode": "F10001",
    "transactionDate": "2022-09-06T15:41:42+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Amazon",
    "amount": -143.21,
    "metadata": {
      "relatedTransactionId": 3
    }
  },
  {
    "transactionId": 5,
    "authorizationCode": "F10002",
    "transactionDate": "2022-09-07T08:32:00+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Walmart",
    "amount": -89.5,
    "metadata": {}
  },
  {
    "transactionId": 6,
    "authorizationCode": "F10002",
    "transactionDate": "2022-09-08T10:00:30+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Walmart",
    "amount": -90.99,
    "metadata": {
      "relatedTransactionId": 5
    }
  },
  {
    "transactionId": 7,
    "authorizationCode": "F10003",
    "transactionDate": "2022-09-08T10:00:30+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Steam",
    "amount": -50.21,
    "metadata": {}
  },
  {
    "transactionId": 8,
    "authorizationCode": "F10001",
    "transactionDate": "2022-09-10T15:41:42+00:00",
    "customerId": 1,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Returned,
    "description": "Amazon",
    "amount": 143.21,
    "metadata": {
      "relatedTransactionId": 4
    }
  },
]