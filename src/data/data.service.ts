import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Transactions } from 'common/types/transaction';
import { CustomerId } from 'common/types/customer';

export const dataUrl = "https://cdn.seen.com/challenge/transactions-v2.json"

@Injectable()
export class DataService {
  private cachedData?: Transactions;
  public async getData(): Promise<Transactions> {
    if (this.cachedData) {
      return this.cachedData;
    }
    const transactionsData = await axios.get(dataUrl);
    this.cachedData = transactionsData.data
    return transactionsData.data;
  }

  public async getTransactionsByCustomerId({
    customerId
  }: {
    customerId: CustomerId
  }) {
    const data: Transactions = await this.getData();
    return data.filter((transaction) => transaction.customerId === customerId)
  }

  public async getTransactionsWithTheSameDeviceIds({
    deviceIds,
    customerId
  }: {
    deviceIds: string[];
    customerId: CustomerId
  }) {
    const transactions = await this.getData();
    return transactions
      .filter(
        (transaction) => transaction.customerId !== customerId && 
          transaction.metadata && transaction.metadata.deviceId &&
          deviceIds.includes(transaction.metadata.deviceId))
  }

  public async getTransactionsWithRelatedTransactionIds({
    transactionIds,
    customerId
  }: {
    transactionIds: number[];
    customerId: CustomerId
  }) {
    const transactions = await this.getData();
    return transactions
      .filter(
        (transaction) => transaction.customerId !== customerId && 
          transaction.metadata && transaction.metadata.relatedTransactionId &&
          transactionIds.includes(transaction.metadata.relatedTransactionId))
  }
}
