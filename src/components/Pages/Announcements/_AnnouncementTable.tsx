import {
	Search,
	Filter,
	Calendar as CalendarIcon,
	Edit,
	Trash2,
	Eye,
	PinIcon,
	Archive,
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import {Button} from "../../ui/button";
import {Input} from "../../ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

interface Announcement {
	id: number;
	title: string;
	content: string;
	type: string;
	priority: string;
	status: string;
	publishDate?: string;
	views: number;
	isPinned?: boolean;
}

interface AnnouncementsTableProps {
	announcements: Announcement[];
	filteredAnnouncements: Announcement[];
	searchTerm: string;
	setSearchTerm: (value: string) => void;
	selectedType: string;
	setSelectedType: (value: string) => void;
	selectedStatus: string;
	setSelectedStatus: (value: string) => void;
	getTypeBadge: (type: string) => JSX.Element;
	getPriorityBadge: (priority: string) => JSX.Element;
	getStatusBadge: (status: string) => JSX.Element;
}

export function AnnouncementsTable({
	announcements,
	filteredAnnouncements,
	searchTerm,
	setSearchTerm,
	selectedType,
	setSelectedType,
	selectedStatus,
	setSelectedStatus,
	getTypeBadge,
	getPriorityBadge,
	getStatusBadge,
}: AnnouncementsTableProps) {
	return (
		<Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
			<CardHeader className="pb-4">
				<CardTitle className="text-xl font-bold">All Announcements</CardTitle>
				<CardDescription className="text-base">
					Manage your news posts and public announcements
				</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Filters + Search */}
				<div className="flex items-center space-x-4 mb-6">
					<div className="relative flex-1 max-w-sm">
						<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search announcements..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10"
						/>
					</div>

					<Select value={selectedType} onValueChange={setSelectedType}>
						<SelectTrigger className="w-[180px]">
							<Filter className="mr-2 h-4 w-4" />
							<SelectValue placeholder="Filter by type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							<SelectItem value="general">General</SelectItem>
							<SelectItem value="maintenance">Maintenance</SelectItem>
							<SelectItem value="emergency">Emergency</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>

					<Select value={selectedStatus} onValueChange={setSelectedStatus}>
						<SelectTrigger className="w-[180px]">
							<Filter className="mr-2 h-4 w-4" />
							<SelectValue placeholder="Filter by status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="published">Published</SelectItem>
							<SelectItem value="draft">Draft</SelectItem>
							<SelectItem value="scheduled">Scheduled</SelectItem>
							<SelectItem value="expired">Expired</SelectItem>
						</SelectContent>
					</Select>
				</div>

				{/* Table */}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Published</TableHead>
							<TableHead>Views</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredAnnouncements.length > 0 ? (
							filteredAnnouncements.map((announcement) => (
								<TableRow key={announcement.id}>
									<TableCell>
										<div className="space-y-1">
											<div className="flex items-center">
												{announcement.isPinned && (
													<PinIcon className="h-3 w-3 text-primary mr-2" />
												)}
												<div className="font-semibold">
													{announcement.title}
												</div>
											</div>
											<div className="text-sm text-muted-foreground line-clamp-2">
												{announcement.content.substring(0, 100)}...
											</div>
										</div>
									</TableCell>
									<TableCell>{getTypeBadge(announcement.type)}</TableCell>
									<TableCell>
										{getPriorityBadge(announcement.priority)}
									</TableCell>
									<TableCell>{getStatusBadge(announcement.status)}</TableCell>
									<TableCell>
										{announcement.publishDate ? (
											<div className="flex items-center text-sm">
												<CalendarIcon className="mr-1 h-3 w-3" />
												{new Date(
													announcement.publishDate
												).toLocaleDateString()}
											</div>
										) : (
											<span className="text-muted-foreground">-</span>
										)}
									</TableCell>
									<TableCell>
										<div className="flex items-center">
											<Eye className="mr-1 h-3 w-3" />
											{announcement.views.toLocaleString()}
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-1">
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													console.log("View Details", announcement.id)
												}
											>
												<Eye className="mr-1 h-4 w-4" />
											</Button>

											<Button
												variant="ghost"
												size="sm"
												onClick={() => console.log("Edit", announcement.id)}
											>
												<Edit className="mr-1 h-4 w-4" />
											</Button>

											{announcement.status === "published" && (
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														console.log("Archive", announcement.id)
													}
												>
													<Archive className="mr-1 h-4 w-4" />
												</Button>
											)}

											<Button
												variant="ghost"
												size="sm"
												className="text-red-600"
												onClick={() => console.log("Delete", announcement.id)}
											>
												<Trash2 className="mr-1 h-4 w-4" />
											</Button>
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
									No Announcements Found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
