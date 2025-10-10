import { useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../../ui/dialog";
import { Calendar } from "../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';
import { Calculator } from "lucide-react";
import { format } from "date-fns";


export function GenerateBillsDialog() {
  const [date, setDate] = useState<Date>();

  return (
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
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
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
                  This will generate bills for all customers with recent meter readings. Customers will be notified via SMS and email.
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
  );
}
