import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create_transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from 'src/entities/transaction.entity';
import { FilterTransactionsDto } from './dto/filter_transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepo: Repository<TransactionEntity>,
  ) {}

  create(data: CreateTransactionDto) {
    const transaction = this.transactionRepo.create(data);
    return this.transactionRepo.save(transaction);
  }

  findAll(filters: FilterTransactionsDto) {
    const query = this.transactionRepo.createQueryBuilder('transaction');
  
    // Si des filtres sont présents, on les applique
    if (filters.date) {
      query.andWhere('transaction.date = :date', { date: filters.date });
    }
  
    if (filters.debit_or_credit) {
      query.andWhere('transaction.debit_or_credit = :type', {
        type: filters.debit_or_credit,
      });
    }
  
    // Si aucun filtre de date → on filtre par le mois en cours
    if (!filters.date) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth(); // JS: 0-based
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0); // dernier jour du mois
  
      query.andWhere('transaction.date BETWEEN :start AND :end', {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      });
    }
  
    query.orderBy('transaction.date', 'DESC');
  
    return query.getMany();
  }

  async delete(id: number) {
  const result = await this.transactionRepo.delete(id);
  if (result.affected === 0) {
    throw new BadRequestException(`Transaction with id ${id} not found`);
  }
  return { message: `Transaction with id ${id} deleted successfully` };
}
  
  // Ajoute update, delete, etc. si besoin
}
