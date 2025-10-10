export interface PaymentDTO {
  id: number;
  customerName: string;
  billId: string;
  amount: number;
  paidDate: string;
  method: string;
  reference: string;
}
