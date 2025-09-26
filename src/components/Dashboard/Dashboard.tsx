import { StatsCards } from "./_StatsCards";
import { WaterConsumptionChart, PaymentStatusPieChart } from "./_Charts";
import { RecentActivity } from "./_RecentActivity";
import { Badge } from "../ui/badge";
import { statsData } from "./dashboardData";

export function Dashboard() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground mt-2">Overview of your water district operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-primary/5 border-primary/20 text-primary font-medium px-3 py-1">
            Last updated: 2 mins ago
          </Badge>
        </div>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <WaterConsumptionChart />
        <PaymentStatusPieChart />
      </div>

      <RecentActivity />
    </div>
  );
}
