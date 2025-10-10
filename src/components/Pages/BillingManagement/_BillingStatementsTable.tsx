import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import {SearchFilter} from "./_SearchFilter";
import {CalendarIcon, CheckCircle, Download, Eye, Send} from "lucide-react";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";

interface Bill {
	id: number;
	customerName: string;
	meterNumber: string;
	previousReading: number;
	currentReading: number;
	consumption: number;
	amount: number;
	dueDate: string;
	status: string;
	paidDate: string | null;
}

interface Props {
	bills: Bill[];
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	selectedStatus: string;
	setSelectedStatus: (value: string) => void;
}

export function BillingStatements({
	bills,
	searchTerm,
	setSearchTerm,
	selectedStatus,
	setSelectedStatus,
}: Props) {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "paid":
				return (
					<Badge className="bg-primary/10 text-primary border-primary/20">
						Paid
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
						Pending
					</Badge>
				);
			case "overdue":
				return (
					<Badge className="bg-destructive/10 text-destructive border-destructive/20">
						Overdue
					</Badge>
				);
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	return (
		<div>
			<SearchFilter
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				selectedStatus={selectedStatus}
				onStatusChange={setSelectedStatus}
			/>
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
					{bills.length > 0 ? (
						bills.map((bill) => (
							<TableRow key={bill.id}>
								<TableCell>
									<div>
										<div className="font-medium">{bill.customerName}</div>
										<div className="text-sm text-muted-foreground">
											{bill.meterNumber}
										</div>
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
								<TableCell className="font-medium">
									₱{bill.amount.toFixed(2)}
								</TableCell>
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
										{bill.status === "pending" && (
											<Button size="sm" variant="outline">
												<Send className="h-3 w-3 mr-1" />
												Send
											</Button>
										)}
									</div>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-center py-6 text-muted-foreground"
							>
								No bills found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
