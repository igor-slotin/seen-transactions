import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerId } from 'common/types/customer';
import { DataService } from 'data/data.service';
import { getGroupedTransactions } from 'common/transactionsGrouping';

@Injectable()
export class CustomerService {
  constructor(private readonly dataService: DataService) {}

  public async getTransactionsForCustomer({
    customerId
  }: {
    customerId: CustomerId
  }) {
    const transactions = await this.dataService.getTransactionsByCustomerId({customerId})
    if (transactions.length === 0) {
      throw new HttpException("Haven't found transactions for the customer", HttpStatus.NOT_FOUND);
    }

    return getGroupedTransactions({transactions})
  }
}
