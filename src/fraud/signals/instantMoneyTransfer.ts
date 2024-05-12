import { TransactionType, Transactions } from "common/types/transaction";

const amountOfMillisecondsInADay = 24 * 60 * 60 * 1000;

export const instantMoneyTransfer = ({customerTransactions}: {
  customerTransactions: Transactions,
}): number[] => {
  // Firstly we want to detect transactions when customer get money from another customer
  // and send it in the same day to some other customer
  // them there is only two types in transactions we're interesting ing:
  // TransactionType.P2PSend and TransactionType.P2PRecieve
  // Also first transaction should be recieve and next one send, so we group all transactions
  // and filter them simultaneoucly by transaction type
  const suspiciousTransactionsTypes = [TransactionType.P2PRecieve, TransactionType.P2PSend];
  // And here we filter all customer transations by this type
  
  const groupedTransactionsByType = new Map<TransactionType, Transactions>();
  for (const customerTransaction of customerTransactions) {
    if (suspiciousTransactionsTypes.includes(customerTransaction.transactionType)) {
      const transactionsList = groupedTransactionsByType.get(customerTransaction.transactionType) || [];
      transactionsList.push(customerTransaction);
      groupedTransactionsByType.set(customerTransaction.transactionType, transactionsList);
    }
  }
  // then we want to find, if for some of recieved transactions we have send transaction
  // with the same amount and between transactions less than 24 hours. 
  // That behaviour we would consider suspicious
  let suspiciousTransactions:Transactions = [];
  const sendTransactions = groupedTransactionsByType.get(TransactionType.P2PSend);
  const recievedTransactions = groupedTransactionsByType.get(TransactionType.P2PRecieve);
  if (!sendTransactions || sendTransactions.length === 0 || !recievedTransactions) {
    return [];
  }
  for (let recieveTransaction of recievedTransactions) {
    const suspiciousSendTransation = sendTransactions.find((transaction) => {
      return Math.abs(transaction.amount) === Math.abs(recieveTransaction.amount) &&
        new Date(transaction.transactionDate).getTime() - new Date(recieveTransaction.transactionDate).getTime() < amountOfMillisecondsInADay
    })
    if (suspiciousSendTransation){
      suspiciousTransactions = suspiciousTransactions.concat([suspiciousSendTransation, recieveTransaction])
    }
  }
  
  return suspiciousTransactions.map(({transactionId}) => transactionId);
}