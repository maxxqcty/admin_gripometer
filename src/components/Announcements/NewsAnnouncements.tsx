import {useState} from "react";
import {Badge} from "../ui/badge";
import {Button} from "../ui/button";
import {AlertTriangle, Info, Wrench, Droplets} from "lucide-react";
import {SummaryCardsSection} from "./_SummaryCardSection"; // ✅ use the new section
import {AnnouncementsTable} from "./_AnnouncementTable";
import CreateAnnouncementDialog from "./_CreateAnnouncement";
import {announcements} from "./announcements";
import {filterData} from "../utils/filterData";

export function NewsAnnouncements() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [publishDate, setPublishDate] = useState<Date>();
	const [expiryDate, setExpiryDate] = useState<Date>();
	const [newAnnouncement, setNewAnnouncement] = useState({
		title: "",
		content: "",
		type: "",
		priority: "",
		isPinned: false,
		schedulePublish: false,
	});

	const getTypeBadge = (type: string) => {
		switch (type) {
			case "maintenance":
				return (
					<Badge className="bg-orange-100 text-orange-800 border-orange-200">
						<Wrench className="h-3 w-3 mr-1" />
						Maintenance
					</Badge>
				);
			case "emergency":
				return (
					<Badge className="bg-red-100 text-red-800 border-red-200">
						<AlertTriangle className="h-3 w-3 mr-1" />
						Emergency
					</Badge>
				);
			case "system":
				return (
					<Badge className="bg-purple-100 text-purple-800 border-purple-200">
						<Info className="h-3 w-3 mr-1" />
						System
					</Badge>
				);
			case "general":
				return (
					<Badge className="bg-blue-100 text-blue-800 border-blue-200">
						<Droplets className="h-3 w-3 mr-1" />
						General
					</Badge>
				);
			default:
				return <Badge variant="outline">{type}</Badge>;
		}
	};

	const getPriorityBadge = (priority: string) => {
		switch (priority) {
			case "high":
				return (
					<Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
				);
			case "medium":
				return (
					<Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
						Medium
					</Badge>
				);
			case "low":
				return (
					<Badge className="bg-green-100 text-green-800 border-green-200">
						Low
					</Badge>
				);
			default:
				return <Badge variant="outline">{priority}</Badge>;
		}
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "published":
				return (
					<Badge className="bg-primary/10 text-primary border-primary/20">
						Published
					</Badge>
				);
			case "draft":
				return (
					<Badge className="bg-gray-100 text-gray-800 border-gray-200">
						Draft
					</Badge>
				);
			case "scheduled":
				return (
					<Badge className="bg-blue-100 text-blue-800 border-blue-200">
						Scheduled
					</Badge>
				);
			case "expired":
				return (
					<Badge className="bg-orange-100 text-orange-800 border-orange-200">
						Expired
					</Badge>
				);
			default:
				return <Badge variant="outline">{status}</Badge>;
		}
	};

	const handleCreateAnnouncement = () => {
		// Handle creating new announcement
		console.log("Creating announcement:", newAnnouncement);
		setIsCreateDialogOpen(false);
		// Reset form
		setNewAnnouncement({
			title: "",
			content: "",
			type: "",
			priority: "",
			isPinned: false,
			schedulePublish: false,
		});
		setPublishDate(undefined);
		setExpiryDate(undefined);
	};

	const filteredAnnouncements = filterData({
		data: announcements,
		searchTerm,
		selectedStatus,
		fields: ["title", "content"],
	}).filter((a) => selectedType === "all" || a.type === selectedType);

	return (
		<div className="flex-1 space-y-8 p-8 pt-8">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight text-foreground">
						Announcements
					</h2>
					<p className="text-muted-foreground mt-2">
						Manage public announcements and news updates for water district
						customers
					</p>
				</div>
				<div className="flex items-center space-x-3">
					<CreateAnnouncementDialog
						open={isCreateDialogOpen}
						onOpenChange={setIsCreateDialogOpen}
						onSubmit={(data) => {
							console.log("New announcement:", data);
							// later: send to API or update local state
						}}
					/>
					<Button onClick={() => setIsCreateDialogOpen(true)}>
						Create Announcement
					</Button>
				</div>
			</div>

			{/* Summary Cards */}
			<SummaryCardsSection />

			{/* Announcements Table */}
			<AnnouncementsTable
				announcements={announcements}
				filteredAnnouncements={filteredAnnouncements}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
				getTypeBadge={getTypeBadge}
				getPriorityBadge={getPriorityBadge}
				getStatusBadge={getStatusBadge}
			/>
		</div>
	);
}
