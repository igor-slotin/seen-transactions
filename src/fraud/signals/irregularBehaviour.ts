import { getGroupedTransactions } from "common/transactionsGrouping";
import { TransactionType, Transactions } from "common/types/transaction";

export const irregularBehaviour = ({customerTransactions}: {customerTransactions: Transactions}) => {
  // here we want to descibe if customer usually collect money and doing some regular things,
  // but at some point doing some not usual transactions

  // asume that we need irregular p2p sendings or recivings.
  // and that amount should be about 1
  // also there should be another settled transactions.

  const groupedTransactions = getGroupedTransactions({transactions: customerTransactions});
  const P2PtransactionsTypes = [TransactionType.P2PRecieve, TransactionType.P2PSend];
  const p2ptransctionsId: number[] = [];
  let amountOfNonP2PTransactions = 0;
  let amountOfP2PTransactions = 0;

  for (const transaction of groupedTransactions) {
    if (P2PtransactionsTypes.includes(transaction.transactionType)) {
      amountOfP2PTransactions += 1;
      p2ptransctionsId.push(transaction.transactionId)
    } else {
      amountOfNonP2PTransactions += 1;
    }
  }

  if (amountOfP2PTransactions === 1 && amountOfNonP2PTransactions >= 1) {
    return p2ptransctionsId;
  }

  return [];
}