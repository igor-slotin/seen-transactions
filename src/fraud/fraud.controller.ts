import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { FraudService } from './fraud.service';

@Controller('fraud')
export class FraudController {
  constructor (private readonly fraudService: FraudService) {}
  @Get('fraud-transactions/:customerId')
  @HttpCode(200)
  public async getCustomerTransactions(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<any> {
    const relatedCustomers = await this.fraudService.getTransactionsForCustomer({customerId});      
    return {relatedCustomers};
  }
}
