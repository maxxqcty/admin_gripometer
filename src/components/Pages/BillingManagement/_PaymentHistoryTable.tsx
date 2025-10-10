import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import {SearchFilter} from "./_SearchFilter";
import {CalendarIcon, Eye, Download, Send} from "lucide-react";
import {Button} from "../../ui/button";
import {Badge} from "../../ui/badge";

interface Payment {
	id: number;
	customerName: string;
	billId: string;
	amount: number;
	paidDate: string; // stored as ISO string in DB
	method: string;
	reference: string;
}

interface PaymentHistoryProps {
	payments: Payment[];
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	date?: Date;
	setDate?: (date: Date | undefined) => void;
}

export function PaymentHistory({
	payments,
	searchTerm,
	setSearchTerm,
	date,
	setDate,
}: PaymentHistoryProps) {
	const getPaymentMethodBadge = (method: string) => {
		const colorMap: {[key: string]: string} = {
			"Bank Transfer": "bg-primary/10 text-primary border-primary/20",
			GCash: "bg-green-100 text-green-800 border-green-200",
			PayMaya: "bg-purple-100 text-purple-800 border-purple-200",
			Cash: "bg-gray-100 text-gray-800 border-gray-200",
		};

		return (
			<Badge
				className={
					colorMap[method] || "bg-gray-100 text-gray-800 border-gray-200"
				}
			>
				{method}
			</Badge>
		);
	};

	return (
		<div className="space-y-4">
			{/* Filters */}
			<SearchFilter
				searchTerm={searchTerm}
				onSearchChange={setSearchTerm}
				date={date}
				onDateChange={(d) => {
					console.log("Selected date:", d);
					if (setDate) setDate(d);
				}}
			/>

			{/* Payments Table */}
			<div className="rounded-md border">
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
						{payments.length > 0 ? (
							payments.map((payment) => (
								<TableRow key={payment.id}>
									<TableCell>{payment.customerName}</TableCell>
									<TableCell>
										<Badge variant="outline">{payment.billId}</Badge>
									</TableCell>
									<TableCell className="font-medium">
										₱{payment.amount.toFixed(2)}
									</TableCell>
									<TableCell className="flex items-center">
										<CalendarIcon className="mr-1 h-3 w-3" />
										{new Date(payment.paidDate).toLocaleDateString()}
									</TableCell>
									<TableCell>{getPaymentMethodBadge(payment.method)}</TableCell>
									<TableCell className="font-mono text-sm">
										{payment.reference}
									</TableCell>
									<TableCell className="text-right flex justify-end gap-2">
										<Button variant="ghost" size="sm" title="View Receipt">
											<Eye className="h-4 w-4" />
										</Button>
										<Button variant="ghost" size="sm" title="Download PDF">
											<Download className="h-3 w-3 mr-1" />
											<span className="text-sm">PDF</span>
										</Button>
										<Button variant="ghost" size="sm" title="Send to Customer">
											<Send className="h-3 w-3 mr-1" />
											<span className="text-sm">Send</span>
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={7}
									className="text-center py-6 text-muted-foreground"
								>
									No payments found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
