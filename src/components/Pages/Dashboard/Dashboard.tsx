import { useEffect, useState } from "react";
import { Badge } from "../../ui/badge";
import { StatsCards } from "./_StatsCards";
import { WaterConsumptionChart, PaymentStatusPieChart } from "./_Charts";
import { RecentActivity } from "./_RecentActivity";
import { fetchDashboardData } from "../../../providers/dashboard_provider";
import { mapDashboardData } from "./dashboardData";
import { DashboardDTO } from "../../../dto/dashboard_dto"; 
import { Loader } from "../../ui/loader";
import { EmptyState } from "../../ui/empty-state";

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardDTO | null>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const dto = await fetchDashboardData();
        const mapped = mapDashboardData(dto);
        setDashboardData(mapped);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <Loader fullScreen text="Loading dashboard..." />;
  if (!dashboardData) return <EmptyState fullScreen title="No dashboard data" />;

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-2">
            Overview of your water district operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className="bg-primary/5 border-primary/20 text-primary font-medium px-3 py-1"
          >
            Last updated: 2 mins ago
          </Badge>
        </div>
      </div>

      <StatsCards statsData={dashboardData.statsData} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <WaterConsumptionChart monthlyData={dashboardData.monthlyData} />
        <PaymentStatusPieChart statusData={dashboardData.statusData} />
      </div>

      <RecentActivity
        recentReadings={dashboardData.recentReadings}
        pendingApprovals={dashboardData.pendingApprovals}
        systemHealth={dashboardData.systemHealth}
      />
    </div>
  );
}
