export class CreateRecurringPaymentDto {
  name: string;
  amount: number;
  date: string; // 'YYYY-MM-DD'
  description: string;
  payment_type: string; // ou enum
  debit_or_credit: string; // ou enum
  accountId: number;
  fake?: boolean;
}
