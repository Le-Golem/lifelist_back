import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from 'src/entities/transaction.entity';
import { TransactionsService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})

export class TransactionModule {}
