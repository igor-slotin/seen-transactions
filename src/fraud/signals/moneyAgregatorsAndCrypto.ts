import { TransactionType, Transactions } from "common/types/transaction";

const suspiciousKeys = [
  "cripto",
  "coin",
  "venmo",
  "zel",
  "paypal"
];

export const moneyAgregatorsAndCrypto = ({customerTransactions}: {customerTransactions: Transactions}) => {
  // here we want to identify if we have transfers to some crypto or money agregators, 
  // and don't have any POS transactions;

  // firstly coun POS transactions
  const customerPOSTransactions = customerTransactions
    .filter(({transactionType}) => transactionType === TransactionType.Pos);

  // if we have POS transactions then it's not our case and we return empty list of p2p transactions
  if (customerPOSTransactions.length > 0) {
    return [];
  }

  // now we want to know if there is any suspicious transactions
  // we will filter transactions that have some of the words 
  // from the list of suspicous keus
  // it's could be a long operation especially in case of big list of suspicious keys and transactions
  // possibly need to find better algorythm or redesign data to have this sign more explicit

  const suspiciousDescriptionTransactions = customerTransactions
    .filter(({description}) => suspiciousKeys.some((key) => description.toLowerCase().includes(key)));

  // again, if no transactions - exit signal detection
  if (suspiciousDescriptionTransactions.length === 0) {
    return [];
  }

  // now we need to find p2p transactions for customer and return thir ids
  return customerTransactions
    .filter(({transactionType}) => (
      transactionType === TransactionType.P2PRecieve || transactionType === TransactionType.P2PSend
    ))
    .map(({transactionId}) => transactionId)
}