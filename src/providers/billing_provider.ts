import { api } from "../api/api";
import { BillDTO } from "../dto/bill_dto"
import { PaymentDTO } from "../dto/payment_dto"


// Fetch all bills
export async function fetchAllBills(): Promise<BillDTO[]> {
  const { data } = await api.get<BillDTO[]>("/bills");
  return data;
}

// Fetch bill by ID
export async function fetchBillById(id: number): Promise<BillDTO> {
  const { data } = await api.get<BillDTO>(`/bills/${id}`);
  return data;
}

// Fetch bills by status
export async function fetchBillsByStatus(status: 'paid' | 'pending' | 'overdue'): Promise<BillDTO[]> {
  const { data } = await api.get<BillDTO[]>(`/bills/status/${status}`);
  return data;
}

// Fetch all payments
export async function fetchAllPayments(): Promise<PaymentDTO[]> {
  const { data } = await api.get<PaymentDTO[]>("/payments");
  return data;
}

// Fetch payments by customer
export async function fetchPaymentsByCustomer(customerName: string): Promise<PaymentDTO[]> {
  const { data } = await api.get<PaymentDTO[]>(`/payments/customer/${encodeURIComponent(customerName)}`);
  return data;
}

// Fetch payment by bill ID
export async function fetchPaymentByBillId(billId: string): Promise<PaymentDTO> {
  const { data } = await api.get<PaymentDTO>(`/payments/bill/${billId}`);
  return data;
}