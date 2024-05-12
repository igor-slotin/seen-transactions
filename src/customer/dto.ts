import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator'
import { TransactionStatus, TransactionType } from 'common/types/transaction';

export class CustomerResponseDTO {
  @ValidateNested()
  transactions: CustomerResponseTransactions[]
}

export class CustomerResponseTransactions {
  @IsString()
  authorizationCode: string;
  
  @IsNumber()
  transactionId: number;

  @IsString()
  createdAt: string;
  
  @IsString()
  updatedAt: string

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsEnum(TransactionType)
  transactionType: TransactionType;
  
  metadata: {};
  
  @ValidateNested()
  timeline: TimelineItem[];
}

class TimelineItem {
  createdAt: string;
  status: TransactionStatus;
  amount: number;
}