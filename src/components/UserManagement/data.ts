import { useMeterReaders, useCustomers } from "../hooks/userData";

// 🧩 This file acts as a bridge — it pulls data using hooks
// and provides them in a unified way for the UI.

export function useUserManagementData() {
  const { meterReaders, loading: loadingReaders, error: errorReaders } = useMeterReaders();
  const { customers, loading: loadingCustomers, error: errorCustomers } = useCustomers();

  const loading = loadingReaders || loadingCustomers;
  const error = errorReaders || errorCustomers;

  return {
    meterReaders,
    customers,
    loading,
    error,
  };
}
