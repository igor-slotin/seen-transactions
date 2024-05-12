import { Module } from '@nestjs/common';
import { FraudController } from './fraud.controller';
import { FraudService } from './fraud.service';
import { DataModule } from 'data/data.module';

@Module({
  imports: [DataModule],
  controllers: [FraudController],
  providers: [FraudService]
})
export class FraudModule {}
