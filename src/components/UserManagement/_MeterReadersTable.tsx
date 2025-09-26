import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";
import { StatusBadge } from "./_statusBadge";
import { Button } from "../ui/button";

interface MeterReader {
  id: number;
  name: string;
  email: string;
  phone: string;
  area: string;
  households: number;
  status: string;
  lastActive: string;
}

interface MeterReadersTableProps {
  data: MeterReader[];
}

export function MeterReadersTable({ data }: MeterReadersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Assigned Area</TableHead>
          <TableHead>Households</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((reader) => (
          <TableRow key={reader.id}>
            <TableCell>
              <div>
                <div className="font-medium">{reader.name}</div>
                <div className="text-sm text-muted-foreground">#MR{reader.id.toString().padStart(3, '0')}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Mail className="mr-1 h-3 w-3" />
                  {reader.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="mr-1 h-3 w-3" />
                  {reader.phone}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                {reader.area}
              </div>
            </TableCell>
            <TableCell>{reader.households}</TableCell>
            <TableCell><StatusBadge status={reader.status} /></TableCell>
            <TableCell className="text-sm text-muted-foreground">{reader.lastActive}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Information</DropdownMenuItem>
                  <DropdownMenuItem>Reset Password</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
