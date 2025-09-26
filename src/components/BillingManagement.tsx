import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Receipt, Calculator, Download, Send, Search, Filter, Calendar as CalendarIcon, DollarSign, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { format } from "date-fns";

const bills = [
  { id: 1, customerName: "Rodriguez Family", meterNumber: "WM001234", previousReading: 1250, currentReading: 1275, consumption: 25, amount: 385.50, dueDate: "2024-02-15", status: "paid", paidDate: "2024-02-10" },
  { id: 2, customerName: "Lopez Household", meterNumber: "WM001235", previousReading: 980, currentReading: 1008, consumption: 28, amount: 421.20, dueDate: "2024-02-15", status: "pending", paidDate: null },
  { id: 3, customerName: "Mendoza Family", meterNumber: "WM001236", previousReading: 1420, currentReading: 1455, consumption: 35, amount: 508.75, dueDate: "2024-02-15", status: "overdue", paidDate: null },
  { id: 4, customerName: "Silva Residence", meterNumber: "WM001237", previousReading: 875, currentReading: 895, consumption: 20, amount: 315.00, dueDate: "2024-02-15", status: "paid", paidDate: "2024-02-08" },
  { id: 5, customerName: "Torres Family", meterNumber: "WM001238", previousReading: 1650, currentReading: 1688, consumption: 38, amount: 545.20, dueDate: "2024-02-15", status: "pending", paidDate: null }
];

const paymentHistory = [
  { id: 1, customerName: "Rodriguez Family", billId: "BL-2024-001", amount: 385.50, paidDate: "2024-02-10", method: "Bank Transfer", reference: "TXN123456789" },
  { id: 2, customerName: "Silva Residence", billId: "BL-2024-004", amount: 315.00, paidDate: "2024-02-08", method: "GCash", reference: "GC987654321" },
  { id: 3, customerName: "Martinez Home", billId: "BL-2024-012", amount: 425.75, paidDate: "2024-02-05", method: "Cash", reference: "CSH001234" },
  { id: 4, customerName: "Gonzales Family", billId: "BL-2024-008", amount: 367.25, paidDate: "2024-02-03", method: "Bank Transfer", reference: "TXN987654321" },
  { id: 5, customerName: "Ramirez Household", billId: "BL-2024-015", amount: 398.50, paidDate: "2024-02-01", method: "PayMaya", reference: "PM456789123" }
];

export function BillingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [date, setDate] = useState<Date>();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const colorMap: { [key: string]: string } = {
      'Bank Transfer': 'bg-primary/10 text-primary border-primary/20',
      'GCash': 'bg-green-100 text-green-800 border-green-200',
      'PayMaya': 'bg-purple-100 text-purple-800 border-purple-200',
      'Cash': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return <Badge className={`${colorMap[method] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>{method}</Badge>;
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Billing Management</h2>
          <p className="text-muted-foreground mt-2">Monitor water bills, payments, and financial reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button><Calculator className="mr-2 h-4 w-4" />Generate Bills</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Generate Monthly Bills</DialogTitle>
                <DialogDescription>
                  Generate bills for all customers based on the latest meter readings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="billing-period" className="text-right">Billing Period</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="col-span-3 justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select billing month"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="rate" className="text-right">Rate per m³</Label>
                  <Input id="rate" placeholder="15.50" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="base-charge" className="text-right">Base Charge</Label>
                  <Input id="base-charge" placeholder="75.00" className="col-span-3" />
                </div>
                <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary">Bill Generation Notice</p>
                      <p className="text-sm text-primary/70 mt-1">
                        This will generate bills for all customers with recent meter readings. 
                        Customers will be notified via SMS and email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  Generate Bills for 1,247 customers
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
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

      <Tabs defaultValue="billing-statements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="billing-statements">Billing Statements</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="billing-statements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Statements</CardTitle>
              <CardDescription>Manage and track customer billing statements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bill.customerName}</div>
                          <div className="text-sm text-muted-foreground">{bill.meterNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{bill.consumption} m³</div>
                          <div className="text-xs text-muted-foreground">
                            {bill.previousReading} → {bill.currentReading}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₱{bill.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {new Date(bill.dueDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell>
                        {bill.paidDate ? (
                          <div className="flex items-center text-sm">
                            <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                            {new Date(bill.paidDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          {bill.status === 'pending' && (
                            <Button size="sm" variant="outline">
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track all customer payments and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Filter by date
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div className="font-medium">{payment.customerName}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.billId}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">₱{payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{getPaymentMethodBadge(payment.method)}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Receipt</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Send to Customer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}