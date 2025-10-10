import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Clock } from "lucide-react";
import { Progress } from "../../ui/progress";

export function RecentActivity({ recentReadings, pendingApprovals, systemHealth }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Recent Meter Readings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meter Readings</CardTitle>
          <CardDescription>Latest submissions from field agents</CardDescription>
        </CardHeader>
        <CardContent>
          {recentReadings.map((reading, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  reading.status === "completed"
                    ? "bg-green-500"
                    : reading.status === "in-progress"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`} />
                <div>
                  <p className="text-sm font-medium">{reading.reader}</p>
                  <p className="text-xs text-muted-foreground">{reading.households} households</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {reading.time}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pending Approvals */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>Customer registrations awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingApprovals.map((approval, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{approval.name}</p>
                <p className="text-xs text-muted-foreground">{approval.address}</p>
              </div>
              <Badge variant="outline">{approval.date}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Overall system performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemHealth.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{item.name}</span>
                <span className="text-sm">{item.value}%</span>
              </div>
              <Progress value={item.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
