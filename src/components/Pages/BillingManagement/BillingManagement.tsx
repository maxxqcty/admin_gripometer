import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { GenerateBillsDialog } from "./_GenerateBillsDialog";
import { BillingSummaryCards } from "./_BillingSummaryCards";
import { BillingStatements } from "./_BillingStatementsTable";
import { PaymentHistory } from "./_PaymentHistoryTable";
import { Button } from "../../ui/button";
import { Download } from "lucide-react";
import { bills, paymentHistory } from "./billingData";
import { filterData } from "../../utils/filterData";

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const filteredBills = useMemo(() => {
    return filterData({
      data: bills,
      searchTerm,
      selectedStatus,
      fields: ["customerName", "id"],
    });
  }, [bills, searchTerm, selectedStatus]);

  const filteredPayments = useMemo(() => {
    return filterData({
      data: paymentHistory,
      searchTerm,
      fields: ["customerName", "reference"],
      extraFilters: [
        (payment) => {
          if (!startDate && !endDate) return true;

          const dbDate = new Date(payment.paidDate);
          const start = startDate ? new Date(startDate) : null;
          const end = endDate ? new Date(endDate) : null;

          return (!start || dbDate >= start) && (!end || dbDate <= end);
        },
      ],
    });
  }, [paymentHistory, searchTerm, startDate, endDate]);

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Billing Management
          </h2>
          <p className="text-muted-foreground mt-2">
            Monitor water bills, payments, and financial reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <GenerateBillsDialog />
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <BillingSummaryCards />

      {/* Tabs */}
      <Tabs defaultValue="billing-statements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="billing-statements">
            Billing Statements
          </TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        {/* Billing Statements */}
        <TabsContent value="billing-statements" className="space-y-4">
          <BillingStatements
            bills={filteredBills}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </TabsContent>

        {/* Payment History */}
        <TabsContent value="payment-history" className="space-y-4">
          <PaymentHistory
            payments={filteredPayments}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
