// components/hooks/useDashboardData.ts
import { useEffect, useState } from "react";
import { apiFetch } from "../api/client"; // ✅ Reusable API helper
import {
  Users,
  Droplets,
  Receipt,
  Database,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

// ---------------- STATS DATA ----------------
export function useStatsData() {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/stats")
      .then((data) => {
        setStatsData([
          {
            title: "Total Customers",
            value: data.totalCustomers.value,
            icon: Users,
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            trend: data.totalCustomers.trend,
            trendIcon: TrendingUp,
            trendText: data.totalCustomers.trendText,
          },
          {
            title: "Water Consumption",
            value: data.waterConsumption.value,
            icon: Droplets,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600",
            trend: data.waterConsumption.trend,
            trendIcon: TrendingUp,
            trendText: data.waterConsumption.trendText,
          },
          {
            title: "Monthly Revenue",
            value: `₱${data.monthlyRevenue.value.toLocaleString()}`,
            icon: Receipt,
            iconBg: "bg-green-500/10",
            iconColor: "text-green-600",
            trend: data.monthlyRevenue.trend,
            trendIcon: TrendingUp,
            trendText: data.monthlyRevenue.trendText,
          },
          {
            title: "Active Meter Readers",
            value: data.activeMeterReaders.value,
            icon: Database,
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600",
            trend: data.activeMeterReaders.trend,
            trendIcon: CheckCircle,
            trendText: data.activeMeterReaders.trendText,
          },
        ]);
      })
      .catch((err) => console.error("Stats fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { statsData, loading };
}

// ---------------- MONTHLY DATA ----------------
export function useMonthlyData() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/monthly")
      .then(setMonthlyData)
      .catch((err) => console.error("Monthly data fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { monthlyData, loading };
}

// ---------------- PAYMENT STATUS (Pie) ----------------
export function useStatusData() {
  const [statusData, setStatusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/status")
      .then(setStatusData)
      .catch((err) => console.error("Status data fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { statusData, loading };
}

// ---------------- RECENT READINGS ----------------
export function useRecentReadings() {
  const [recentReadings, setRecentReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/readings")
      .then(setRecentReadings)
      .catch((err) => console.error("Readings fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { recentReadings, loading };
}

// ---------------- PENDING APPROVALS ----------------
export function usePendingApprovals() {
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/approvals")
      .then(setPendingApprovals)
      .catch((err) => console.error("Approvals fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { pendingApprovals, loading };
}

// ---------------- SYSTEM HEALTH ----------------
export function useSystemHealth() {
  const [systemHealth, setSystemHealth] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/health")
      .then(setSystemHealth)
      .catch((err) => console.error("System health fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return { systemHealth, loading };
}
