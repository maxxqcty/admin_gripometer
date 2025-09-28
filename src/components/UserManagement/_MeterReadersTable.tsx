import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

import {Eye, Mail, Phone, MapPin, Edit, Key, Trash2} from "lucide-react";
import {StatusBadge} from "./_statusBadge";
import {Button} from "../ui/button";

interface MeterReader {
	id: number;
	name: string;
	email: string;
	phone: string;
	area: string;
	households: number;
	status: string;
	lastActive: string;
	accountNumber: string;
}

interface MeterReadersTableProps {
	data: MeterReader[];
}

export function MeterReadersTable({data}: MeterReadersTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Account Number</TableHead>
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
				{data.length > 0 ? (
					data.map((reader) => (
						<TableRow key={reader.id}>
							{/* Account Number */}
							<TableCell className="font-medium">
								{reader.accountNumber}
							</TableCell>

							{/* Name */}
							<TableCell className="font-medium">
								{reader.name}
								<div className="text-sm text-muted-foreground">
									#MR{reader.id.toString().padStart(3, "0")}
								</div>
							</TableCell>

							{/* Contact */}
							<TableCell>
								<div className="flex flex-col space-y-1">
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

							{/* Assigned Area */}
							<TableCell>
								<div className="flex items-center">
									<MapPin className="mr-1 h-3 w-3" />
									{reader.area}
								</div>
							</TableCell>

							{/* Households */}
							<TableCell>{reader.households}</TableCell>

							{/* Status */}
							<TableCell>
								<StatusBadge status={reader.status} />
							</TableCell>

							{/* Last Active */}
							<TableCell className="text-sm text-muted-foreground">
								{reader.lastActive}
							</TableCell>

							{/* Actions */}
							<TableCell className="text-right">
								<div className="flex justify-end gap-2">
									<Button variant="ghost" size="icon" title="View Details">
										<Eye className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="icon" title="Edit Information">
										<Edit className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="icon" title="Reset Password">
										<Key className="h-4 w-4" />
									</Button>
									<Button variant="destructive" size="icon" title="Deactivate">
										<Trash2 className="h-4 w-4" />
									</Button>
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
							No Meter Readers Found
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
