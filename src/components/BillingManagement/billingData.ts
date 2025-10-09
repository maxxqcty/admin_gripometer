// components/billingManagement/billingData.ts
import { useBillingData, usePaymentHistory } from "../hooks/useBillingData";

export function useBillingValues() {
  // ✅ Call the hooks once here
  const { bills, loading: billsLoading, error: billsError } = useBillingData();
  const {
    paymentHistory,
    loading: paymentsLoading,
    error: paymentsError,
  } = usePaymentHistory();

  // ✅ You can combine loading/errors if needed
  const loading = billsLoading || paymentsLoading;
  const error = billsError || paymentsError;

  return { bills, paymentHistory, loading, error };
}
