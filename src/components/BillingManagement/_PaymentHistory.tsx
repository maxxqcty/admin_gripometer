import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { SearchFilter } from "./_SearchFilter";
import { CalendarIcon, Eye } from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

interface Payment {
  id: number;
  customerName: string;
  billId: string;
  amount: number;
  paidDate: string;
  method: string;
  reference: string;
}

interface Props {
  payments: Payment[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  date?: Date;
  setDate?: (date: Date) => void;
}

export function PaymentHistory({ payments, searchTerm, setSearchTerm, date, setDate }: Props) {
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
    <div>
      <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} date={date} onDateChange={setDate} />
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
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.customerName}</TableCell>
              <TableCell><Badge variant="outline">{payment.billId}</Badge></TableCell>
              <TableCell className="font-medium">₱{payment.amount.toFixed(2)}</TableCell>
              <TableCell className="flex items-center">
                <CalendarIcon className="mr-1 h-3 w-3" />
                {new Date(payment.paidDate).toLocaleDateString()}
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
    </div>
  );
}
