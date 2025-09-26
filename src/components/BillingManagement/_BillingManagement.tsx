import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GenerateBillsDialog } from "./_GenerateBillsDialog";
import { BillingSummaryCards } from "./_BillingSummaryCards";
import { BillingStatements } from "./_BillingStatements";
import { PaymentHistory } from "./_PaymentHistory";
import { Button } from "../ui/button";
import { Download } from 'lucide-react';
import { bills, paymentHistory } from "./billingData";

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [date, setDate] = useState<Date>();

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Billing Management</h2>
          <p className="text-muted-foreground mt-2">Monitor water bills, payments, and financial reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <GenerateBillsDialog />
          <Button variant="outline"><Download className="mr-2 h-4 w-4" />Export</Button>
        </div>
      </div>

      <BillingSummaryCards />

      <Tabs defaultValue="billing-statements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="billing-statements">Billing Statements</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="billing-statements" className="space-y-4">
          <BillingStatements
            bills={bills}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
          />
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <PaymentHistory
            payments={paymentHistory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            date={date}
            setDate={setDate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
