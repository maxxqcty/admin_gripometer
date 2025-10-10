import { Badge } from "../../ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
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
}
