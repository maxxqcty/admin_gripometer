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
import { Users, UserPlus, Search, Filter, MapPin, Phone, Mail, Calendar, MoreHorizontal, CheckCircle, XCircle, Clock } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const meterReaders = [
  { id: 1, name: "Juan Cruz", email: "juan.cruz@waterdistrict.gov", phone: "+63 912 345 6789", area: "District A", households: 45, status: "active", lastActive: "2 hours ago" },
  { id: 2, name: "Maria Santos", email: "maria.santos@waterdistrict.gov", phone: "+63 923 456 7890", area: "District B", households: 38, status: "active", lastActive: "4 hours ago" },
  { id: 3, name: "Pedro Garcia", email: "pedro.garcia@waterdistrict.gov", phone: "+63 934 567 8901", area: "District C", households: 42, status: "offline", lastActive: "1 day ago" },
  { id: 4, name: "Ana Reyes", email: "ana.reyes@waterdistrict.gov", phone: "+63 945 678 9012", area: "District D", households: 35, status: "active", lastActive: "30 minutes ago" },
  { id: 5, name: "Carlos Mendoza", email: "carlos.mendoza@waterdistrict.gov", phone: "+63 956 789 0123", area: "District E", households: 40, status: "inactive", lastActive: "3 days ago" }
];

const customers = [
  { id: 1, name: "Rodriguez Family", email: "rodriguez@gmail.com", phone: "+63 917 123 4567", address: "123 Main Street, Barangay 1", meterNumber: "WM001234", status: "approved", registrationDate: "2024-01-15" },
  { id: 2, name: "Lopez Household", email: "lopez.family@yahoo.com", phone: "+63 928 234 5678", address: "456 Oak Avenue, Barangay 2", meterNumber: "WM001235", status: "pending", registrationDate: "2024-01-18" },
  { id: 3, name: "Mendoza Family", email: "mendoza.home@gmail.com", phone: "+63 939 345 6789", address: "789 Pine Road, Barangay 3", meterNumber: "WM001236", status: "pending", registrationDate: "2024-01-20" },
  { id: 4, name: "Silva Residence", email: "silva.residence@outlook.com", phone: "+63 940 456 7890", address: "321 Elm Street, Barangay 1", meterNumber: "WM001237", status: "approved", registrationDate: "2024-01-12" },
  { id: 5, name: "Torres Family", email: "torres.family@gmail.com", phone: "+63 951 567 8901", address: "654 Maple Drive, Barangay 4", meterNumber: "WM001238", status: "rejected", registrationDate: "2024-01-22" }
];

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>;
      case 'offline':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Offline</Badge>;
      case 'inactive':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Inactive</Badge>;
      case 'approved':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">User Management</h2>
        <p className="text-muted-foreground mt-2">Manage meter readers and customer accounts</p>
      </div>

      <Tabs defaultValue="meter-readers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meter-readers">Meter Readers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="meter-readers" className="space-y-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Meter Readers Management</CardTitle>
                  <CardDescription className="text-base">Manage field agents responsible for collecting water meter readings</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button><UserPlus className="mr-2 h-4 w-4" />Add Meter Reader</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Meter Reader</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new meter reader. They will receive login credentials via email.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="Full name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Phone</Label>
                        <Input id="phone" placeholder="+63 xxx xxx xxxx" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="area" className="text-right">Area</Label>
                        <Select>
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="district-a">District A</SelectItem>
                            <SelectItem value="district-b">District B</SelectItem>
                            <SelectItem value="district-c">District C</SelectItem>
                            <SelectItem value="district-d">District D</SelectItem>
                            <SelectItem value="district-e">District E</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Meter Reader</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search meter readers..."
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  {meterReaders.map((reader) => (
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
                      <TableCell>{getStatusBadge(reader.status)}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Customer Management</CardTitle>
              <CardDescription className="text-base">Approve and manage registered customer households</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
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
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  {customers.map((customer) => (
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
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}