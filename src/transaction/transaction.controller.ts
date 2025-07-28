import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { TransactionsService } from "./transaction.service";
import { FilterTransactionsDto } from "./dto/filter_transaction.dto";
import { CreateTransactionDto } from "./dto/create_transaction.dto";

@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionsService
    ) {}

    @Post()
    create(@Body() dto: CreateTransactionDto) {
      return this.transactionService.create(dto);
    }

    @Get()
    findAll(@Query() filters: FilterTransactionsDto) {
    return this.transactionService.findAll(filters);
    }

}