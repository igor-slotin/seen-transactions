import { TransactionStatus, Transactions } from "common/types/transaction";
import { transactionByAuthCodeObjectMaper } from "./transactionByAuthCodeObjectMaper";

const sortingMapByTransactionStatus = {
  [TransactionStatus.Pendting]: 0,
  [TransactionStatus.Settled]: 1,
  [TransactionStatus.Returned]: 2,
}

export const groupedTransactionsSorter = ({
  groupedTransactions
}: {
  groupedTransactions: Map<string, Transactions>
}) => {
  return [
    ...groupedTransactions.entries()
  ].map((transactionsGroupedItem) => {
    const sortedTransactions = transactionsGroupedItem[1].sort((a, b) => (
      sortingMapByTransactionStatus[a.transactionStatus] - sortingMapByTransactionStatus[b.transactionStatus]
    ))
    
    return transactionByAuthCodeObjectMaper({transactions: sortedTransactions});
  })
}