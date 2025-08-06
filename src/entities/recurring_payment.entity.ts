import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecuringPaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  amount: number;

  @Column({ type: 'date' })
  date: string;

  @Column()
  description: string;

  @Column()
  payment_type: string;

  @Column()
  debit_or_credit: string;

  @Column()
  accountId: number;

  @Column({ default: false })
  fake: boolean;

  @Column({ default: false })
  isPayed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastActivatedDate: Date | null;
}
