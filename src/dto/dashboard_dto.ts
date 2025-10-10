// src/dto/dashboard.dto.ts
import { LucideIcon } from "lucide-react";

// ✅ Monthly consumption & bills
export interface MonthlyDataDTO {
  name: string;
  consumption: number;
  bills: number;
}

// ✅ Payment status for Pie Chart
export interface StatusDataDTO {
  name: string;
  value: number;
  color: string;
}

// ✅ Recent meter readings
export interface RecentReadingDTO {
  reader: string;
  households: number;
  time: string;
  status: "completed" | "in-progress" | "pending";
}

// ✅ Pending approvals
export interface PendingApprovalDTO {
  name: string;
  address: string;
  date: string;
}

// ✅ System health metrics
export interface SystemHealthDTO {
  name: string;
  value: number;
}

// ✅ Dashboard stats cards
export interface StatCardDTO {
  title: string;
  value: string | number;
  icon?: LucideIcon;           
  iconName?: string;           
  iconBg: string;
  iconColor: string;
  trend: string;
  trendIcon?: LucideIcon;      
  trendIconName?: string;      
  trendText: string;
}


// ✅ Complete dashboard data response
export interface DashboardDTO {
  monthlyData: MonthlyDataDTO[];
  statusData: StatusDataDTO[];
  recentReadings: RecentReadingDTO[];
  pendingApprovals: PendingApprovalDTO[];
  systemHealth: SystemHealthDTO[];
  statsData: StatCardDTO[];
}
