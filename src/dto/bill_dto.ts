export type BillStatus = 'paid' | 'pending' | 'overdue';

export interface BillDTO {
  id: number;
  customerName: string;
  meterNumber: string;
  previousReading: number;
  currentReading: number;
  consumption: number;
  amount: number;
  dueDate: string;
  status: BillStatus;
  paidDate: string | null;
}
