import { CustomerId } from "./customer";
export type Transactions = TransactionsItem[]

export type TransactionId = number;
export type DeviceId = string;

export type TransactionsItem = {
  transactionId: TransactionId;
  authorizationCode: string;
  transactionDate: string;
  customerId: CustomerId;
  transactionType: TransactionType;
  transactionStatus: TransactionStatus;
  description: string;
  amount: number;
  metadata: Metadata;
}

export enum TransactionType {
  AchIncoming = "ACH_INCOMING",
  AchOutgoing = "ACH_OUTGOING",
  Pos = "POS",
  WireIncoming = "WIRE_INCOMING",
  WireOutgoing = "WIRE_OUTGOING",
  Fee = "FEE",
  P2PSend = "P2P_SEND",
  P2PRecieve = "P2P_RECEIVE",
}

export enum TransactionStatus {
  Pendting = "PENDING",
  Settled = "SETTLED",
  Returned = "RETURNED"
}

export type Metadata = {
  relatedTransactionId?: TransactionId
  deviceId?: DeviceId;
}