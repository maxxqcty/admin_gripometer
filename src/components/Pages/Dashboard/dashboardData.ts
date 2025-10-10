// src/components/Dashboard/data.ts
import {DashboardDTO} from "../../../dto/dashboard_dto";
import {iconMap} from "../../utils/dashboardIconMap";

// // Local fallback icons for mock data
// import {
// 	Users,
// 	Droplets,
// 	Receipt,
// 	Database,
// 	TrendingUp,
// 	CheckCircle,
// } from "lucide-react";

// /* -------------------------------------------------------------------------- */
// /*                          💾 Local Mock / Fallback Data                     */
// /* -------------------------------------------------------------------------- */

// // Monthly consumption & bills
// export const monthlyData = [
// 	{name: "Jan", consumption: 4221, bills: 320},
// 	{name: "Feb", consumption: 3800, bills: 298},
// 	{name: "Mar", consumption: 4100, bills: 315},
// 	{name: "Apr", consumption: 4500, bills: 342},
// 	{name: "May", consumption: 4800, bills: 365},
// 	{name: "Jun", consumption: 5200, bills: 398},
// ];

// // // Payment status for Pie Chart
// export const statusData = [
// 	{name: "Paid", value: 78, color: "#10b981"},
// 	{name: "Pending", value: 15, color: "#8b5cf6"},
// 	{name: "Overdue", value: 7, color: "#ef4444"},
// ];

// // // Recent meter readings
// export const recentReadings = [
// 	{
// 		reader: "Juan Cruz",
// 		households: 23,
// 		time: "2 hours ago",
// 		status: "completed",
// 	},
// 	{
// 		reader: "Maria Santos",
// 		households: 18,
// 		time: "4 hours ago",
// 		status: "completed",
// 	},
// 	{
// 		reader: "Pedro Garcia",
// 		households: 15,
// 		time: "6 hours ago",
// 		status: "in-progress",
// 	},
// ];

// // // Pending approvals
// export const pendingApprovals = [
// 	{name: "Rodriguez Family", address: "123 Main St", date: "Today"},
// 	{name: "Lopez Household", address: "456 Oak Ave", date: "Yesterday"},
// 	{name: "Mendoza Family", address: "789 Pine Rd", date: "2 days ago"},
// ];

// // System health metrics
// export const systemHealth = [
// 	{name: "Database Performance", value: 95},
// 	{name: "API Response Time", value: 87},
// 	{name: "Server Uptime", value: 99},
// ];

// // Dashboard stats cards (mock local)
// export const statsData = [
// 	{
// 		title: "Total Customers",
// 		value: "1,245",
// 		icon: Users,
// 		iconBg: "bg-primary/10",
// 		iconColor: "text-primary",
// 		trend: "+12%",
// 		trendIcon: TrendingUp,
// 		trendText: "from last month",
// 	},
// 	{
// 		title: "Water Consumption",
// 		value: "5,200",
// 		icon: Droplets,
// 		iconBg: "bg-blue-500/10",
// 		iconColor: "text-blue-600",
// 		trend: "+8%",
// 		trendIcon: TrendingUp,
// 		trendText: "cubic meters this month",
// 	},
// 	{
// 		title: "Monthly Revenue",
// 		value: "₱186,420",
// 		icon: Receipt,
// 		iconBg: "bg-green-500/10",
// 		iconColor: "text-green-600",
// 		trend: "+5%",
// 		trendIcon: TrendingUp,
// 		trendText: "from last month",
// 	},
// 	{
// 		title: "Active Meter Readers",
// 		value: "18",
// 		icon: Database,
// 		iconBg: "bg-purple-500/10",
// 		iconColor: "text-purple-600",
// 		trend: "All active",
// 		trendIcon: CheckCircle,
// 		trendText: "this week",
// 	},
// ];

/* -------------------------------------------------------------------------- */
/*                        ⚙️  Mapper from DTO → UI Format                    */
/* -------------------------------------------------------------------------- */

/**
 * Converts DashboardDTO (from Symfony backend)
 * into the UI-ready format that your components already use.
 */
export function mapDashboardData(dto: DashboardDTO) {
	return {
		monthlyData: dto.monthlyData,
		statusData: dto.statusData,
		recentReadings: dto.recentReadings,
		pendingApprovals: dto.pendingApprovals,
		systemHealth: dto.systemHealth,
		statsData: dto.statsData.map((stat: any) => ({
      ...stat,
      icon: iconMap[stat.iconName] || null,
      trendIcon: iconMap[stat.trendIconName] || null,
      iconBg: stat.iconBg || "bg-gray-100",
      iconColor: stat.iconColor || "text-gray-600",
    })),
	};
}

/* -------------------------------------------------------------------------- */
/*                          🌐 Default export (mock)                          */
/* -------------------------------------------------------------------------- */

/**
 * Default export allows easy fallback if backend is unavailable.
 */
// export const dashboardMockData = {
// 	monthlyData,
// 	statusData,
// 	recentReadings,
// 	pendingApprovals,
// 	systemHealth,
// 	statsData,
// };
