import { Transactions } from "common/types/transaction";

export const groupTransactionsByAuthCode = ({
  transactions
}: {
  transactions: Transactions
}): Map<string, Transactions> => {
  return transactions.reduce((accumulator, value) => {
    const transactionsList = accumulator.get(value.authorizationCode) || [];
    transactionsList.push(value);
    accumulator.set(value.authorizationCode, transactionsList);
    return accumulator;
  }, new Map<string, Transactions>());
}