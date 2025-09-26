import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { meterReaders, customers } from "./data";
import { MeterReadersTable } from "./_MeterReadersTable";
import { CustomersTable } from "./_CustomersTable";
import { AddMeterReaderDialog } from "./_AddMeterReaderDialog";
import { SearchFilter } from "./_SearchFilter";

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

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

        <TabsContent value="meter-readers">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4 flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Meter Readers Management</CardTitle>
                <CardDescription className="text-base">Manage field agents responsible for collecting water meter readings</CardDescription>
              </div>
              <AddMeterReaderDialog />
            </CardHeader>
            <CardContent>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                statusOptions={[
                  { value: "all", label: "All Status" },
                  { value: "active", label: "Active" },
                  { value: "offline", label: "Offline" },
                  { value: "inactive", label: "Inactive" },
                ]}
              />
              <MeterReadersTable data={meterReaders} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Customer Management</CardTitle>
              <CardDescription className="text-base">Approve and manage registered customer households</CardDescription>
            </CardHeader>
            <CardContent>
              <SearchFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                statusOptions={[
                  { value: "all", label: "All Status" },
                  { value: "approved", label: "Approved" },
                  { value: "pending", label: "Pending" },
                  { value: "rejected", label: "Rejected" },
                ]}
              />
              <CustomersTable data={customers} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
