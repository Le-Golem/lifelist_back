import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { CreateAccountDto } from "./dto/create_account.dto";
import { UpdateAccountDto } from "./dto/update_account.dto";


@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>
  ) {}

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  async updateAccount(id: number, updateDto: UpdateAccountDto): Promise<AccountEntity> {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) throw new Error('Account not found');
  
    if (updateDto.amount !== undefined) {
      account.amount = updateDto.amount;
    }
  
    if (updateDto.debt !== undefined) {
      account.debt = updateDto.debt;
    }

    if (updateDto.crediter !== undefined) {
      account.crediter = updateDto.crediter;
    }
      
    return this.accountRepository.save(account);
  }
  
  
}
