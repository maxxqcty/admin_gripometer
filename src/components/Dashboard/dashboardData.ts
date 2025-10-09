// components/Dashboard/dashboardData.ts
import {
  useStatsData,
  useMonthlyData,
  useStatusData,
  useRecentReadings,
  usePendingApprovals,
  useSystemHealth,
} from "../hooks/useDashboardData";

export function useDashboardValues() {
  const { statsData, loading: statsLoading } = useStatsData();
  const { monthlyData, loading: monthlyLoading } = useMonthlyData();
  const { statusData, loading: statusLoading } = useStatusData();
  const { recentReadings, loading: readingsLoading } = useRecentReadings();
  const { pendingApprovals, loading: approvalsLoading } = usePendingApprovals();
  const { systemHealth, loading: healthLoading } = useSystemHealth();

  // Combine loading states
  const loading =
    statsLoading ||
    monthlyLoading ||
    statusLoading ||
    readingsLoading ||
    approvalsLoading ||
    healthLoading;

  return {
    statsData,
    monthlyData,
    statusData,
    recentReadings,
    pendingApprovals,
    systemHealth,
    loading,
  };
}
