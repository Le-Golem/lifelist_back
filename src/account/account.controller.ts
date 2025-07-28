import { AccountEntity } from "src/entities/account.entity";
import { AccountService } from "./account.service";
import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create_account.dto";
import { UpdateAccountDto } from "./dto/update_account.dto";

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService
  ) {}

    @Get()
    async getAllAccounts(): Promise<AccountEntity[]> {
    return this.accountService.findAll();
    }

    @Post()
    async createAccount(@Body() createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    return this.accountService.create(createAccountDto);
    }

    @Patch(':id')
    async updateAccount(
    @Param('id') id: number,
    @Body() updateAccountDto: UpdateAccountDto
    ): Promise<AccountEntity> {
    return this.accountService.updateAccount(id, updateAccountDto);
}
}
