import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class TransactionEntity {
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
    payment_type: string; // ou enum
  
    @Column()
    debit_or_credit: string; // ou enum
  
    @Column()
    accountId: number;
  
    @Column({ default: false })
    fake: boolean;
  }
  