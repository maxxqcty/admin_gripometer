import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Users, Droplets, Receipt, Database, TrendingUp, CheckCircle } from "lucide-react";

// ✅ Import statsData from your unified dashboard data
// import { useStatsData } from "./dashboardData";

import { statsData } from "./dashboardData";

export function StatsCards() {
  // const { statsData } = useStatsData();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, idx) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trendIcon;
        return (
          <Card
            key={idx}
            className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
              <div className={`w-10 h-10 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600 inline-flex items-center font-medium">
                  <TrendIcon className="h-4 w-4 mr-1" />
                  {stat.trend}
                </span>{" "}
                {stat.trendText}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
