import { useEffect, useState } from "react";
import { apiFetch } from "../api/client"; // ✅ Reusable API handler

// 🔹 Define Meter Reader type
export type MeterReaderStatus = "active" | "inactive" | "offline" | string;

export type MeterReader = {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  households: number;
  status: MeterReaderStatus;
  lastActive: string;
  accountNumber: string;
};

// 🔹 Define Customer type
export type CustomerStatus = "approved" | "pending" | "rejected" | "suspended" | string;

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  meterNumber: string;
  accountNumber: string;
  status: CustomerStatus;
  registrationDate: Date;
};

// ---------------- METER READERS ----------------
export function useMeterReaders() {
  const [meterReaders, setMeterReaders] = useState<MeterReader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/meter-readers")
      .then((data) => setMeterReaders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { meterReaders, loading, error };
}

// ---------------- CUSTOMERS ----------------
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiFetch("/customers")
      .then((data) =>
        setCustomers(
          data.map((cust: any) => ({
            ...cust,
            registrationDate: new Date(cust.registrationDate),
          }))
        )
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { customers, loading, error };
}
