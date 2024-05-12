import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DataModule } from 'data/data.module';

@Module({
  imports: [DataModule],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}

