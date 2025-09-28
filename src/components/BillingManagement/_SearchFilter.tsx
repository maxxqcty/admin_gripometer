import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus?: string;
  onStatusChange?: (value: string) => void;
  startDate?: string;
  onStartDateChange?: (date: string | undefined) => void;
  endDate?: string;
  onEndDateChange?: (date: string | undefined) => void;
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Status filter */}
      {selectedStatus !== undefined && onStatusChange && (
        <Select value={selectedStatus} onValueChange={onStatusChange}>
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
      )}

      {/* Date range filter */}
      {(onStartDateChange || onEndDateChange) && (
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={startDate ?? ""}
            onChange={(e) => onStartDateChange?.(e.target.value || undefined)}
            className="w-[160px]"
          />
          <span>to</span>
          <Input
            type="date"
            value={endDate ?? ""}
            onChange={(e) => onEndDateChange?.(e.target.value || undefined)}
            className="w-[160px]"
          />
        </div>
      )}
    </div>
  );
}
