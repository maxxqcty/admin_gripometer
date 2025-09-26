import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Textarea } from "./ui/textarea";
import { Database, HardDrive, Users, Receipt, Droplets, Download, Upload, RefreshCw, Search, Calendar, AlertTriangle, CheckCircle, Activity, Server, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const systemMetrics = [
  { time: '00:00', cpu: 45, memory: 62, disk: 78, network: 23 },
  { time: '04:00', cpu: 38, memory: 58, disk: 78, network: 19 },
  { time: '08:00', cpu: 65, memory: 72, disk: 79, network: 45 },
  { time: '12:00', cpu: 78, memory: 81, disk: 80, network: 67 },
  { time: '16:00', cpu: 85, memory: 88, disk: 81, network: 78 },
  { time: '20:00', cpu: 72, memory: 75, disk: 82, network: 56 },
];

const databaseTables = [
  { name: 'users', records: 1247, size: '2.4 MB', lastModified: '2024-01-25 14:30', status: 'healthy' },
  { name: 'households', records: 1247, size: '3.1 MB', lastModified: '2024-01-25 14:28', status: 'healthy' },
  { name: 'meter_readings', records: 15684, size: '12.8 MB', lastModified: '2024-01-25 16:45', status: 'healthy' },
  { name: 'billing_statements', records: 8945, size: '8.2 MB', lastModified: '2024-01-25 15:20', status: 'healthy' },
  { name: 'payments', records: 6732, size: '4.6 MB', lastModified: '2024-01-25 16:12', status: 'healthy' },
  { name: 'meter_readers', records: 18, size: '0.1 MB', lastModified: '2024-01-20 09:15', status: 'healthy' },
  { name: 'system_logs', records: 45892, size: '67.3 MB', lastModified: '2024-01-25 16:50', status: 'warning' }
];

const backupHistory = [
  { id: 1, date: '2024-01-25', time: '02:00', type: 'Full Backup', size: '156.8 MB', status: 'completed', duration: '12 min' },
  { id: 2, date: '2024-01-24', time: '02:00', type: 'Full Backup', size: '154.2 MB', status: 'completed', duration: '11 min' },
  { id: 3, date: '2024-01-23', time: '02:00', type: 'Full Backup', size: '152.6 MB', status: 'completed', duration: '10 min' },
  { id: 4, date: '2024-01-22', time: '02:00', type: 'Full Backup', size: '151.1 MB', status: 'completed', duration: '12 min' },
  { id: 5, date: '2024-01-21', time: '02:00', type: 'Full Backup', size: '149.8 MB', status: 'failed', duration: '- -' }
];

export function DatabaseControl() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Error</Badge>;
      case 'completed':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Database Control</h2>
          <p className="text-muted-foreground mt-2">Monitor and manage system database, backups, and performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Backup Now
          </Button>
        </div>
      </div>

      {/* System Status Alert */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>System Status: Operational</AlertTitle>
        <AlertDescription>
          All systems are running normally. Last system check completed 5 minutes ago.
        </AlertDescription>
      </Alert>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Records</CardTitle>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Database className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">78,663</div>
            <p className="text-sm text-muted-foreground">Across all tables</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Database Size</CardTitle>
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <HardDrive className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">98.5 MB</div>
            <p className="text-sm text-muted-foreground">Storage used</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Last Backup</CardTitle>
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">12h ago</div>
            <p className="text-sm text-muted-foreground">156.8 MB backup</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">System Health</CardTitle>
            <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">98%</div>
            <p className="text-sm text-emerald-600 font-medium">Excellent</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="tables">Database Tables</TabsTrigger>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">System Performance</CardTitle>
                <CardDescription className="text-base">Real-time server metrics over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={systemMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="CPU %" />
                    <Area type="monotone" dataKey="memory" stackId="2" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} name="Memory %" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Storage Utilization</CardTitle>
                <CardDescription className="text-base">Current storage usage by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Data</span>
                    <span className="text-sm">45.2 MB</span>
                  </div>
                  <Progress value={46} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Billing Records</span>
                    <span className="text-sm">28.4 MB</span>
                  </div>
                  <Progress value={29} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Logs</span>
                    <span className="text-sm">18.7 MB</span>
                  </div>
                  <Progress value={19} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temporary Files</span>
                    <span className="text-sm">6.2 MB</span>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Database Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Active Users</span>
                  </div>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-primary" />
                    <span className="text-sm">Meter Readings</span>
                  </div>
                  <span className="font-medium">15,684</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Receipt className="h-4 w-4 text-primary" />
                    <span className="text-sm">Billing Records</span>
                  </div>
                  <span className="font-medium">8,945</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-primary" />
                    <span className="text-sm">System Logs</span>
                  </div>
                  <span className="font-medium">45,892</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Connection Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Connections</span>
                    <span className="text-sm font-medium">12/50</span>
                  </div>
                  <Progress value={24} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Query Performance</span>
                    <span className="text-sm font-medium">95ms avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>All connections stable</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Security Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>SSL/TLS Encryption Active</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Firewall Protection Enabled</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Regular Security Patches</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Access Logs Monitored</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Database Tables</CardTitle>
              <CardDescription className="text-base">Manage and monitor all database tables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Table Name</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {databaseTables.map((table, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Database className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{table.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{table.records.toLocaleString()}</TableCell>
                      <TableCell>{table.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {table.lastModified}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(table.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button size="sm" variant="outline">Optimize</Button>
                          <Button size="sm" variant="outline">Export</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backups" className="space-y-4">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Backup Management</CardTitle>
              <CardDescription className="text-base">Manage database backups and restore points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Backup
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Latest
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Auto-backup scheduled daily at 2:00 AM
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backupHistory.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {backup.date}
                        </div>
                      </TableCell>
                      <TableCell>{backup.time}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{backup.type}</Badge>
                      </TableCell>
                      <TableCell>{backup.size}</TableCell>
                      <TableCell>{backup.duration}</TableCell>
                      <TableCell>{getStatusBadge(backup.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {backup.status === 'completed' && (
                            <>
                              <Button size="sm" variant="outline">
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                Restore
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">Database Maintenance</CardTitle>
                <CardDescription className="text-base">Perform routine maintenance tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Optimize Tables</h4>
                      <p className="text-sm text-muted-foreground">Defragment and optimize database tables</p>
                    </div>
                    <Button variant="outline">Run</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Clear Logs</h4>
                      <p className="text-sm text-muted-foreground">Remove old system logs (older than 30 days)</p>
                    </div>
                    <Button variant="outline">Run</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Update Statistics</h4>
                      <p className="text-sm text-muted-foreground">Refresh database statistics for query optimization</p>
                    </div>
                    <Button variant="outline">Run</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Index Rebuild</h4>
                      <p className="text-sm text-muted-foreground">Rebuild database indexes for better performance</p>
                    </div>
                    <Button variant="outline">Run</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold">System Configuration</CardTitle>
                <CardDescription className="text-base">Manage database and system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="backup-schedule">Backup Schedule</Label>
                    <Input id="backup-schedule" value="Daily 2:00 AM" className="col-span-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="retention-period">Retention Period</Label>
                    <Input id="retention-period" value="30 days" className="col-span-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="max-connections">Max Connections</Label>
                    <Input id="max-connections" value="50" className="col-span-2" />
                  </div>
                  
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="query-timeout">Query Timeout</Label>
                    <Input id="query-timeout" value="30 seconds" className="col-span-2" />
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Manual SQL Query</CardTitle>
              <CardDescription className="text-base">Execute custom SQL queries (Use with caution)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter your SQL query here..."
                className="min-h-[120px] font-mono"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-muted-foreground">
                    Be careful when executing queries on production data
                  </span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline">Validate</Button>
                  <Button>Execute</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}