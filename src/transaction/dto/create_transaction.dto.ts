import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsBoolean, IsIn } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 'Anniversaire Steph & Ced' })
  @IsString()
  name: string;

  @ApiProperty({ example: 17.5 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: '2025-07-04' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 'Virement pour Steph' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'VIREMENT', enum: ['VIREMENT', 'CB', 'ESPECES'] })
  @IsString()
  payment_type: string;

  @ApiProperty({ example: 'debit', enum: ['debit', 'credit'] })
  @IsIn(['debit', 'credit'])
  debit_or_credit: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  accountId: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  fake: boolean;
}
