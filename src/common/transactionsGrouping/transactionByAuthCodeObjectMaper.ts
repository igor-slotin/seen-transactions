import { Transactions } from "common/types/transaction";

export const transactionByAuthCodeObjectMaper = ({transactions}: {transactions: Transactions}) => {
  const lastTransaction = transactions[transactions.length - 1];
  return {
    authorizationCode: transactions[0].authorizationCode,
    transactionId: transactions[0].transactionId,
    createdAt: transactions[0].transactionDate,
    updatedAt: lastTransaction.transactionDate,
    status: lastTransaction.transactionStatus,
    transactionType: transactions[0].transactionType,
    metadata: lastTransaction.metadata,
    timeline: transactions.map((transaction) => ({
      createdAt: transaction.transactionDate,
      status: transaction.transactionStatus,
      amount: transaction.amount
    }))
  }
}