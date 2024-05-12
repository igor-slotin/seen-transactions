import { TransactionStatus, TransactionType } from "common/types/transaction";
import { moneyAgregatorsAndCrypto } from "./moneyAgregatorsAndCrypto";

describe("Money agregators and crypto", () => {
  it ("Should return p2p transactions if customer send it to coinbase", () => {
    const p2ptransactions = moneyAgregatorsAndCrypto({customerTransactions: mockedDataCoinbase});
    
    expect(p2ptransactions.length).toBe(1);
  });

  it ("Shouldn't return p2p transactions when customer has POS transfers", () => {
    const p2ptransactions = moneyAgregatorsAndCrypto({customerTransactions: mockedDataCoinbasePOS});
    
    expect(p2ptransactions.length).toBe(0);
  });

})

const mockedDataCoinbase = [
  {
    "transactionId": 26,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Coinbase",
    "amount": 10000,
    "metadata": {
      "deviceId": "F210200"
    }
  },
  {
    "transactionId": 27,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Igor",
    "amount": -10000,
    "metadata": {
      "deviceId": "F210200"
    }
  },
];

const mockedDataCoinbasePOS = [
  {
    "transactionId": 23,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-05T11:36:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Pendting,
    "description": "Amazon",
    "amount": -1000,
    "metadata": {}
},
{
    "transactionId": 24,
    "authorizationCode": "F10014",
    "transactionDate": "2022-10-06T15:41:42+00:00",
    "customerId": 8,
    "transactionType": TransactionType.Pos,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Amazon",
    "amount": -1000,
    "metadata": {
        "relatedTransactionId": 23
    }
},
  {
    "transactionId": 26,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Coinbase",
    "amount": 10000,
    "metadata": {
      "deviceId": "F210200"
    }
  },

  {
    "transactionId": 26,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.WireIncoming,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Deposit from Coinbase",
    "amount": 10000,
    "metadata": {
      "deviceId": "F210200"
    }
  },
  {
    "transactionId": 27,
    "authorizationCode": "F10012",
    "transactionDate": "2022-09-11T06:30:00+00:00",
    "customerId": 5,
    "transactionType": TransactionType.P2PSend,
    "transactionStatus": TransactionStatus.Settled,
    "description": "Transfer to Igor",
    "amount": -9000,
    "metadata": {
      "deviceId": "F210200"
    }
  },
]