import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerId } from 'common/types/customer';
import { DataService } from 'data/data.service';
import {
  collectAndWithdraw,
  instantMoneyTransfer,
  irregularBehaviour,
  moneyAgregatorsAndCrypto,
  getDeviceIds
} from './signals';

@Injectable()
export class FraudService {
  constructor(private readonly dataService: DataService) { }

  public async getTransactionsForCustomer({ customerId }: { customerId: CustomerId }) {
    const customerTransactions = await this.dataService.getTransactionsByCustomerId({ customerId });

    const signalsTransactionIds = [...new Set([
      ...collectAndWithdraw({ customerTransactions }),
      ...instantMoneyTransfer({ customerTransactions }),
      ...irregularBehaviour({ customerTransactions }),
      ...moneyAgregatorsAndCrypto({ customerTransactions })
    ])];

    const [deviceIdsTransactions, relatedTransactions] = await Promise.all([
      this.dataService.getTransactionsWithTheSameDeviceIds({
        deviceIds: getDeviceIds({ transactions: customerTransactions }),
        customerId
      }),
      this.dataService.getTransactionsWithRelatedTransactionIds({
        transactionIds: signalsTransactionIds,
        customerId
      })
    ])

    if (relatedTransactions.length === 0 && deviceIdsTransactions.length === 0) {
      throw new HttpException("Haven't found any related suspicious customer", HttpStatus.NOT_FOUND);
    }

    return {
      relatedCustomers: [
        ...relatedTransactions.map(transaction => this.formatRelatedCustomer({
          customerId: transaction.customerId,
          relation: transaction.transactionType
        })),
        ...deviceIdsTransactions.map(transaction => this.formatRelatedCustomer({
          customerId: transaction.customerId,
          relation: "DEVICE"
        }))
      ]
    }
  }

  private formatRelatedCustomer({
    customerId,
    relation
  }: {
    customerId: CustomerId,
    relation: string
  }) {
    return {
      relatedCustomerId: customerId,
      relationType: relation,
    }
  }
}
