// src/account/dto/update_account.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @ApiPropertyOptional({ example: 200 })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNumber()
  debt?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  crediter?: boolean;
}
