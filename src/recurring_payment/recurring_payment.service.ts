import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecuringPaymentEntity } from "src/entities/recurring_payment.entity";
import { Repository } from "typeorm";

import { UpdateRecurringPaymentDto } from "./dto/update_recurring_payment.dto";
import { TransactionsService } from "src/transaction/transaction.service";
import { CreateRecurringPaymentDto } from "./dto/create_recurring_payment.dto";

@Injectable()
export class RecurringPaymentService {
  constructor(
    @InjectRepository(RecuringPaymentEntity)
    private readonly recurringPaymentRepository: Repository<RecuringPaymentEntity>,
    private readonly transactionService: TransactionsService,
  ) {}

  async findAll(): Promise<RecuringPaymentEntity[]> {
    const payments = await this.recurringPaymentRepository.find();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    for (const p of payments) {
      if (p.lastActivatedDate) {
        const lastDate = new Date(p.lastActivatedDate);
        if (lastDate.getMonth() !== currentMonth || lastDate.getFullYear() !== currentYear) {
          p.isPayed = false;
          await this.recurringPaymentRepository.save(p);
        }
      }
    }

    return payments;
  }

  async create(createDto: CreateRecurringPaymentDto): Promise<RecuringPaymentEntity> {
    const payment = this.recurringPaymentRepository.create(createDto);
    return this.recurringPaymentRepository.save(payment);
  }

  async delete(id: number): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.recurringPaymentRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return { deleted: true };
    }
    return { deleted: false, message: "Recurring payment not found" };
  }

  async update(id: number, updateDto: UpdateRecurringPaymentDto): Promise<RecuringPaymentEntity> {
    const payment = await this.recurringPaymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Recurring payment not found');
    }
    Object.assign(payment, updateDto);
    return this.recurringPaymentRepository.save(payment);
  }

  async markAsPaid(id: number): Promise<RecuringPaymentEntity> {
    const payment = await this.recurringPaymentRepository.findOneBy({ id });
    if (!payment) {
      throw new NotFoundException('Recurring payment not found');
    }
    if (payment.isPayed) {
      return payment;
    }

    // Transaction atomique (via QueryRunner) pour éviter incohérence
    const queryRunner = this.recurringPaymentRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      payment.isPayed = true;
      payment.lastActivatedDate = new Date();

      const transactionDto = {
        name: payment.name,
        amount: payment.amount,
        date: new Date().toISOString().slice(0, 10),
        description: payment.description,
        payment_type: payment.payment_type,
        debit_or_credit: payment.debit_or_credit,
        accountId: payment.accountId,
        fake: payment.fake,
      };

      await this.transactionService.create(transactionDto);

      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();

      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
