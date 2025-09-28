// src/components/Dashboard/data.ts
import { useEffect, useState } from "react";
import { Users, Droplets, Receipt, Database, TrendingUp, CheckCircle } from "lucide-react";
// Monthly consumption & bills
export const monthlyData = [
  { name: 'Jan', consumption: 4221, bills: 320 },
  { name: 'Feb', consumption: 3800, bills: 298 },
  { name: 'Mar', consumption: 4100, bills: 315 },
  { name: 'Apr', consumption: 4500, bills: 342 },
  { name: 'May', consumption: 4800, bills: 365 },
  { name: 'Jun', consumption: 5200, bills: 398 }
];

// Payment status for Pie Chart
export const statusData = [
  { name: 'Paid', value: 78, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#8b5cf6' },
  { name: 'Overdue', value: 7, color: '#ef4444' }
];

// Recent meter readings
export const recentReadings = [
  { reader: "Juan Cruz", households: 23, time: "2 hours ago", status: "completed" },
  { reader: "Maria Santos", households: 18, time: "4 hours ago", status: "completed" },
  { reader: "Pedro Garcia", households: 15, time: "6 hours ago", status: "in-progress" }
];

// Pending approvals
export const pendingApprovals = [
  { name: "Rodriguez Family", address: "123 Main St", date: "Today" },
  { name: "Lopez Household", address: "456 Oak Ave", date: "Yesterday" },
  { name: "Mendoza Family", address: "789 Pine Rd", date: "2 days ago" }
];

// System health metrics
export const systemHealth = [
  { name: "Database Performance", value: 95 },
  { name: "API Response Time", value: 87 },
  { name: "Server Uptime", value: 99 }
];

// Dashboard stats cards
export const statsData = [
  {
    title: "Total Customers",
    value: "1,247",
    icon: Users,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    trend: "+12%",
    trendIcon: TrendingUp,
    trendText: "from last month",
  },
  {
    title: "Water Consumption",
    value: "5,200",
    icon: Droplets,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
    trend: "+8%",
    trendIcon: TrendingUp,
    trendText: "cubic meters this month",
  },
  {
    title: "Monthly Revenue",
    value: "₱186,420",
    icon: Receipt,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
    trend: "+5%",
    trendIcon: TrendingUp,
    trendText: "from last month",
  },
  {
    title: "Active Meter Readers",
    value: "18",
    icon: Database,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
    trend: "All active",
    trendIcon: CheckCircle,
    trendText: "this week",
  },
];




// ---------------- STATS DATA ----------------
export function useStatsData() {
  const [statsData, setStatsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        setStatsData([
          {
            title: "Total Customers",
            value: data.totalCustomers,
            icon: Users,
            iconBg: "bg-primary/10",
            iconColor: "text-primary",
            trend: "+12%",
            trendIcon: TrendingUp,
            trendText: "from last month",
          },
          {
            title: "Water Consumption",
            value: data.waterConsumption,
            icon: Droplets,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-600",
            trend: "+8%",
            trendIcon: TrendingUp,
            trendText: "cubic meters this month",
          },
          {
            title: "Monthly Revenue",
            value: `₱${data.monthlyRevenue.toLocaleString()}`,
            icon: Receipt,
            iconBg: "bg-green-500/10",
            iconColor: "text-green-600",
            trend: "+5%",
            trendIcon: TrendingUp,
            trendText: "from last month",
          },
          {
            title: "Active Meter Readers",
            value: data.activeMeterReaders,
            icon: Database,
            iconBg: "bg-purple-500/10",
            iconColor: "text-purple-600",
            trend: "All active",
            trendIcon: CheckCircle,
            trendText: "this week",
          },
        ]);
        setLoading(false);
      });
  }, []);

  return { statsData, loading };
}

// ---------------- MONTHLY DATA ----------------
export function useMonthlyData() {
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/monthly")
      .then((res) => res.json())
      .then((data) => {
        setMonthlyData(data); // Symfony should return: [{name: "Jan", consumption: 4221, bills: 320}, ...]
        setLoading(false);
      });
  }, []);

  return { monthlyData, loading };
}

// ---------------- PAYMENT STATUS (Pie) ----------------
export function useStatusData() {
  const [statusData, setStatusData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/status")
      .then((res) => res.json())
      .then((data) => {
        setStatusData(data); // Symfony should return: [{ name: 'Paid', value: 78, color: '#10b981' }, ...]
        setLoading(false);
      });
  }, []);

  return { statusData, loading };
}

// ---------------- RECENT READINGS ----------------
export function useRecentReadings() {
  const [recentReadings, setRecentReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/readings")
      .then((res) => res.json())
      .then((data) => {
        setRecentReadings(data); // Symfony should return: [{ reader: "Juan", households: 23, time: "2 hours ago", status: "completed" }, ...]
        setLoading(false);
      });
  }, []);

  return { recentReadings, loading };
}

// ---------------- PENDING APPROVALS ----------------
export function usePendingApprovals() {
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/approvals")
      .then((res) => res.json())
      .then((data) => {
        setPendingApprovals(data); // Symfony should return: [{ name: "Rodriguez Family", address: "...", date: "Today" }, ...]
        setLoading(false);
      });
  }, []);

  return { pendingApprovals, loading };
}

// ---------------- SYSTEM HEALTH ----------------
export function useSystemHealth() {
  const [systemHealth, setSystemHealth] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/health")
      .then((res) => res.json())
      .then((data) => {
        setSystemHealth(data); // Symfony should return: [{ name: "Database Performance", value: 95 }, ...]
        setLoading(false);
      });
  }, []);

  return { systemHealth, loading };
}
