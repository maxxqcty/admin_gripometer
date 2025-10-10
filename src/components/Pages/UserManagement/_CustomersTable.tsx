import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import {
	CalendarIcon,
	Mail,
	Phone,
	MapPin,
	Calendar,
	CheckCircle,
	XCircle,
	Edit,
	Eye,
	Trash2,
} from "lucide-react";
import {StatusBadge} from "./_statusBadge";
import {Button} from "../../ui/button";

interface Customer {
	id: number;
	name: string;
	email: string;
	phone: string;
	address: string;
	meterNumber: string;
	accountNumber: string;
	status: string;
	registrationDate: string;
}

interface CustomersTableProps {
	data: Customer[];
}

export function CustomersTable({data}: CustomersTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Account Number</TableHead>
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
				{data.length > 0 ? (
					data.map((customer) => (
						<TableRow key={customer.id}>
							{/* Account Number */}
							<TableCell className="font-medium">
								{customer.accountNumber}
							</TableCell>

							{/* Customer Name */}
							<TableCell className="font-medium">{customer.name}</TableCell>

							{/* Contact */}
							<TableCell>
								<div className="flex flex-col space-y-1">
									<div className="flex items-center text-sm">
										<Mail className="mr-1 h-3 w-3" /> {customer.email}
									</div>
									<div className="flex items-center text-sm">
										<Phone className="mr-1 h-3 w-3" /> {customer.phone}
									</div>
								</div>
							</TableCell>

							{/* Address */}
							<TableCell>
								<div className="flex items-center max-w-xs">
									<MapPin className="mr-1 h-3 w-3 flex-shrink-0" />
									<span className="truncate">{customer.address}</span>
								</div>
							</TableCell>

							{/* Meter Number */}
							<TableCell>{customer.meterNumber}</TableCell>

							{/* Status */}
							<TableCell>
								<StatusBadge status={customer.status} />
							</TableCell>

							{/* Registration Date */}
							<TableCell>
								<div className="flex items-center text-sm">
									<Calendar className="mr-1 h-3 w-3" />
									{new Date(customer.registrationDate).toLocaleDateString()}
								</div>
							</TableCell>

							{/* Actions */}
							<TableCell className="text-right">
								<div className="flex items-center justify-end space-x-2">
									{customer.status === "pending" && (
										<>
											<Button
												size="sm"
												variant="outline"
												className="text-primary border-primary hover:bg-primary/5"
											>
												<CheckCircle className="h-3 w-3 mr-1" /> Approve
											</Button>
											<Button
												size="sm"
												variant="outline"
												className="text-destructive border-destructive hover:bg-destructive/5"
											>
												<XCircle className="h-3 w-3 mr-1" /> Reject
											</Button>
										</>
									)}
									<div className="flex justify-end gap-2">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => console.log("View Details")}
											title="View Details"
										>
											<Eye className="h-4 w-4" />
										</Button>

										<Button
											variant="ghost"
											size="sm"
											onClick={() => console.log("Edit Information")}
											title="Edit Information"
										>
											<Edit className="h-4 w-4" />
										</Button>

										<Button
											variant="ghost"
											size="sm"
											onClick={() => console.log("View Bills")}
											title="View Bills"
										>
											<CalendarIcon className="h-4 w-4" />
										</Button>

										<Button
											variant="destructive"
											size="sm"
											onClick={() => console.log("Suspend Account")}
											title="Suspend Account"
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={8}
							className="text-center py-6 text-muted-foreground"
						>
							No Customers Found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
