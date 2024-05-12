import { TransactionStatus, TransactionType, Transactions } from "common/types/transaction";

export const collectAndWithdraw = ({customerTransactions}: {customerTransactions: Transactions}): number[] => {
  // we need to detect if customer only collects the money and then withdraw it or send to another bank account
  // so firstly let's identify if customer has withdraw transactions
  const withdrawTransactionTypes = [TransactionType.AchOutgoing, TransactionType.WireOutgoing];
  const withdrawTransactions = customerTransactions
    .filter(({transactionType}) => withdrawTransactionTypes.includes(transactionType))
  
  // if there is no withdraws then this is not the case for this check
  if (withdrawTransactions.length === 0) {
    return [];
  }

  // for withdraw transactions we suppose to have a fee, so the total amount on the customer balance
  // should be all withdraw ammounts plus fee per withdraw
  // and also we would need to collect all p2p transactions for further processing and to calculate 
  // is amount is the same as total amount of withdraw money
  let totalWithdrawAmmount = 0;
  let totalP2PRecieveAmount = 0;
  let p2pRecieveTransactions: Transactions = []
  for (const customerTransaction of customerTransactions) {
    if (
      (
        withdrawTransactionTypes.includes(customerTransaction.transactionType) || 
        customerTransaction.transactionType === TransactionType.Fee
      ) && 
      customerTransaction.transactionStatus === TransactionStatus.Settled
    ) {
        totalWithdrawAmmount += Math.abs(customerTransaction.amount)
    }
    if (customerTransaction.transactionType === TransactionType.P2PRecieve) {
      totalP2PRecieveAmount += Math.abs(customerTransaction.amount);
      p2pRecieveTransactions.push(customerTransaction);
    }
  }

  if (totalWithdrawAmmount - totalP2PRecieveAmount === 0) {
    return p2pRecieveTransactions.map(({transactionId}) => transactionId);
  } 

  return [];
}