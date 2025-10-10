import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";
import { UserPlus } from "lucide-react";

export function AddMeterReaderDialog() {
  return (
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
  );
}
