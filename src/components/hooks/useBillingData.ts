import { useEffect, useState } from "react";
import { apiFetch } from "../api/client"; // ✅ Reusable API helper

export type BillStatus = "paid" | "pending" | "overdue" | string;

export type Bill = {
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
  registrationDate?: Date; // 🧾 Optional if added in backend
};

export type Payment = {
  id: number;
  customerName: string;
  billId: string;
  amount: number;
  paidDate: string;
  method: string;
  reference: string;
};

// ---------------- BILLING DATA ----------------
export function useBillingData() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/bills")
      .then((data) => setBills(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { bills, loading, error };
}

// ---------------- PAYMENT HISTORY ----------------
export function usePaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/payments")
      .then((data) => setPaymentHistory(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { paymentHistory, loading, error };
}
