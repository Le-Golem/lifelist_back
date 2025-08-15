import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from 'src/entities/transaction.entity';
import { TransactionsService } from './transaction.service';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    AccountModule
],
  controllers: [TransactionController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})

export class TransactionModule {}
