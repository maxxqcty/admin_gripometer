import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Receipt, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

export function BillingSummaryCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Total Bills Generated</CardTitle>
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Receipt className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">1,247</div>
          <p className="text-sm text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Total Amount</CardTitle>
          <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">₱186,420</div>
          <p className="text-sm text-muted-foreground">Expected revenue</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Paid Bills</CardTitle>
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">972</div>
          <p className="text-sm text-muted-foreground">78% collection rate</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-semibold text-muted-foreground">Overdue Bills</CardTitle>
          <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground mb-2">87</div>
          <p className="text-sm text-red-600 font-medium">Requires attention</p>
        </CardContent>
      </Card>
    </div>
  );
}
