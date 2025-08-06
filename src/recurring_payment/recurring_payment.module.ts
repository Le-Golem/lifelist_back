import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecuringPaymentEntity } from 'src/entities/recurring_payment.entity';
import { RecurringPaymentController } from './recurring_payment.controller';
import { RecurringPaymentService } from './recurring_payment.service';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecuringPaymentEntity]),
    TransactionModule,
  ],
  controllers: [RecurringPaymentController],
  providers: [RecurringPaymentService],
})

export class RecurringPaymentModule {}
