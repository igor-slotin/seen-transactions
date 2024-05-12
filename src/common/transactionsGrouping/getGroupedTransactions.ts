import { Transactions } from "common/types/transaction";
import { groupedTransactionsSorter } from "./groupedTransactionsSorter";
import { groupTransactionsByAuthCode } from "./groupTransactionsByAuthCode";

export const getGroupedTransactions = ({transactions}: {transactions: Transactions}) => {
  return groupedTransactionsSorter({groupedTransactions: groupTransactionsByAuthCode({transactions})})
}