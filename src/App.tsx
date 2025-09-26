import { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Receipt, 
  Database, 
  Settings, 
  Bell, 
  LogOut,
  Droplets,
  Shield,
  Megaphone
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement/_UserManagment.tsx';
import { BillingManagement } from './components/BillingManagement/_BillingManagement.tsx';
import { DatabaseControl } from './components/DatabaseControl';
import { NewsAnnouncements } from './components/NewsAnnouncements';
import { Settings as SettingsIcon } from './components/Settings';

import { AuthLayout } from './components/AuthLayout';
import Logo from "./components/ui/logo/Logo.tsx";

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'User Management', icon: Users, id: 'users' },
  { name: 'Billing Management', icon: Receipt, id: 'billing' },
  { name: 'Announcements', icon: Megaphone, id: 'news' },
  { name: 'Database Control', icon: Database, id: 'database' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate against a backend
    setIsAuthenticated(true);
    setUser({
      email: email,
      name: 'John Dela Cruz'
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!isAuthenticated) {
    return <AuthLayout onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'news':
        return <NewsAnnouncements />;
      case 'database':
        return <DatabaseControl />;
      case 'settings':
        return <Settings user={user} onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r bg-gradient-to-b from-sidebar to-sidebar/95">
          <SidebarHeader className="p-6 border-b border-sidebar-border/50">
            <div className="flex items-center space-x-4">
            <Logo size={100} withText={false} />
              <div>
                <h1 className="text-xl font-bold text-sidebar-foreground">GripoMeter</h1>
                <p className="text-sm text-sidebar-foreground/70">Water District Admin</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-3 py-4">
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:bg-sidebar-accent/80 data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary data-[active=true]:to-primary/90 data-[active=true]:text-primary-foreground data-[active=true]:shadow-lg"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <div className="mt-8 px-1">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-5 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">System Status</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-3 font-medium">All Systems Operational</Badge>
                <p className="text-xs text-sidebar-foreground/60">
                  Last system check: 5 minutes ago
                </p>
              </div>
            </div>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-sidebar-border/50">
            <div className="flex items-center space-x-3 p-3 bg-sidebar-accent/30 rounded-xl">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-sidebar-foreground">{user?.name}</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">System Administrator</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="bg-gradient-to-r from-background to-background/95 border-b border-border px-8 py-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <SidebarTrigger className="hover:bg-primary/10" />
                <div>
                  <h1 className="text-3xl font-bold text-foreground tracking-tight">Municipal Water District</h1>
                  <p className="text-base text-muted-foreground font-medium mt-1">Administrative Control Panel</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <Button variant="outline" size="default" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50 shadow-sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  <Badge className="ml-3 bg-destructive/10 text-destructive hover:bg-destructive/10 font-semibold">3</Badge>
                </Button>
                
                <div className="flex items-center space-x-3 text-sm bg-green-50 px-4 py-2 rounded-full border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 font-medium">System Online</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 bg-gradient-to-br from-muted/20 to-muted/40 min-h-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}