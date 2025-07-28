import { IsOptional, IsIn, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterTransactionsDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsIn(['debit', 'credit'])
  debit_or_credit?: 'debit' | 'credit';
}
