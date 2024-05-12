import { Controller, Get, HttpCode, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';

import { CustomerResponseDTO } from './dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  
  @Get('customer-transactions/:customerId')
  @HttpCode(200)
  public async getCustomerTransactions(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<CustomerResponseDTO> {
    const transactions = await this.customerService.getTransactionsForCustomer({customerId});      
    return {transactions};
  }
}
