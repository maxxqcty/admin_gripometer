import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { MoreHorizontal, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle } from "lucide-react";
import { StatusBadge } from "./_statusBadge";
import { Button } from "../ui/button";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  meterNumber: string;
  status: string;
  registrationDate: string;
}

interface CustomersTableProps {
  data: Customer[];
}

export function CustomersTable({ data }: CustomersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Meter Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>
              <div>
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">#CU{customer.id.toString().padStart(4, '0')}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="mr-1 h-3 w-3" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-1 h-3 w-3" />
                  {customer.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center max-w-xs">
                <MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="truncate">{customer.address}</span>
              </div>
            </TableCell>
            <TableCell>{customer.meterNumber}</TableCell>
            <TableCell><StatusBadge status={customer.status} /></TableCell>
            <TableCell>
              <div className="flex items-center text-sm">
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(customer.registrationDate).toLocaleDateString()}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                {customer.status === 'pending' && (
                  <>
                    <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/5">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive/5">
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Information</DropdownMenuItem>
                    <DropdownMenuItem>View Bills</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Suspend Account</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
