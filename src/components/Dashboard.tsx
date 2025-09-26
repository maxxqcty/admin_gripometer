import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Droplets, Receipt, Database, TrendingUp, TrendingDown, Clock, CheckCircle } from 'lucide-react';
import Logo from "./ui/logo/Logo.tsx";


const monthlyData = [
  { name: 'Jan', consumption: 4221, bills: 320 },
  { name: 'Feb', consumption: 3800, bills: 298 },
  { name: 'Mar', consumption: 4100, bills: 315 },
  { name: 'Apr', consumption: 4500, bills: 342 },
  { name: 'May', consumption: 4800, bills: 365 },
  { name: 'Jun', consumption: 5200, bills: 398 }
];

const statusData = [
  { name: 'Paid', value: 78, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#8b5cf6' },
  { name: 'Overdue', value: 7, color: '#ef4444' }
];

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
      
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Customers</CardTitle>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">1,247</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 inline-flex items-center font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Water Consumption</CardTitle>
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">5,200</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 inline-flex items-center font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8%
              </span>
              cubic meters this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Monthly Revenue</CardTitle>
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Receipt className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">₱186,420</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 inline-flex items-center font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Active Meter Readers</CardTitle>
            <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Database className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">18</div>
            <p className="text-sm text-muted-foreground">
              <span className="text-green-600 inline-flex items-center font-medium">
                <CheckCircle className="h-4 w-4 mr-1" />
                All active
              </span>
              this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Water Consumption & Bills Generated</CardTitle>
            <CardDescription className="text-base">Monthly overview of water usage and billing</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consumption" fill="#00539a" name="Consumption (m³)" />
                <Bar dataKey="bills" fill="#10b981" name="Bills Generated" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold">Payment Status</CardTitle>
            <CardDescription className="text-base">Current month billing status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">Recent Meter Readings</CardTitle>
            <CardDescription className="text-base">Latest submissions from field agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { reader: "Juan Cruz", households: 23, time: "2 hours ago", status: "completed" },
              { reader: "Maria Santos", households: 18, time: "4 hours ago", status: "completed" },
              { reader: "Pedro Garcia", households: 15, time: "6 hours ago", status: "in-progress" }
            ].map((reading, index) => (
              <div key={index} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${reading.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
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

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">Pending Approvals</CardTitle>
            <CardDescription className="text-base">Customer registrations awaiting approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Rodriguez Family", address: "123 Main St", date: "Today" },
              { name: "Lopez Household", address: "456 Oak Ave", date: "Yesterday" },
              { name: "Mendoza Family", address: "789 Pine Rd", date: "2 days ago" }
            ].map((approval, index) => (
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

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold">System Health</CardTitle>
            <CardDescription className="text-base">Overall system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database Performance</span>
                <span className="text-sm">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Response Time</span>
                <span className="text-sm">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Sync Status</span>
                <span className="text-sm">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}