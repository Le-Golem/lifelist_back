// src/account/dto/create_account.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({ example: 'Compte courant' })
  @IsString()
  name: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  debt: number;

  @ApiProperty({ example: false })
  @IsBoolean()
  crediter: boolean;
}
