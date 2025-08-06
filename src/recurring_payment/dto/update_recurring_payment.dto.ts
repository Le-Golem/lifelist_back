import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from 'src/transaction/dto/create_transaction.dto';

export class UpdateRecurringPaymentDto extends PartialType(CreateTransactionDto) {}