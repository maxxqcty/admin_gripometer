// components/Dashboard/Dashboard.tsx
import { useDashboardValues } from "./dashboardData";

export function Dashboard() {
  const {
    statsData,
    monthlyData,
    statusData,
    recentReadings,
    pendingApprovals,
    systemHealth,
    loading,
  } = useDashboardValues();

  if (loading) return <p>Loading dashboard data...</p>;

  return (
    <div className="p-8 space-y-8">
      {/* Example usage */}
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Example render */}
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              <span className="font-semibold">{stat.title}</span>
            </div>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.trendText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
