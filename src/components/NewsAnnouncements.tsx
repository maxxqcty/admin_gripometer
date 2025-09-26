import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Edit, 
  Trash2, 
  Eye, 
  AlertTriangle, 
  Info, 
  Wrench, 
  Droplets,
  Clock,
  Users,
  Send,
  MoreHorizontal,
  PinIcon,
  Archive
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
// Simple date formatting utility
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const announcements = [
  {
    id: 1,
    title: "Scheduled Water Interruption - District A",
    content: "Water supply will be temporarily interrupted in District A on March 15, 2024, from 8:00 AM to 4:00 PM for pipeline maintenance.",
    type: "maintenance",
    priority: "high",
    status: "published",
    publishDate: "2024-03-10",
    expiryDate: "2024-03-16",
    views: 1247,
    isPinned: true,
    author: "Admin"
  },
  {
    id: 2,
    title: "New Water Conservation Guidelines",
    content: "In response to the current dry season, the Municipal Water District is implementing new water conservation measures effective April 1, 2024.",
    type: "general",
    priority: "medium",
    status: "published",
    publishDate: "2024-03-08",
    expiryDate: "2024-04-30",
    views: 892,
    isPinned: false,
    author: "Admin"
  },
  {
    id: 3,
    title: "Billing System Maintenance",
    content: "Our online billing system will undergo scheduled maintenance on March 20, 2024, from 12:00 AM to 6:00 AM. During this time, online payments may be temporarily unavailable.",
    type: "system",
    priority: "medium",
    status: "published",
    publishDate: "2024-03-09",
    expiryDate: "2024-03-21",
    views: 654,
    isPinned: false,
    author: "Admin"
  },
  {
    id: 4,
    title: "Water Quality Test Results - February 2024",
    content: "We are pleased to announce that all water quality tests conducted in February 2024 have met or exceeded national safety standards.",
    type: "general",
    priority: "low",
    status: "published",
    publishDate: "2024-03-05",
    expiryDate: "2024-03-31",
    views: 423,
    isPinned: false,
    author: "Admin"
  },
  {
    id: 5,
    title: "Emergency Water Supply Protocol Update",
    content: "Updated emergency water supply protocols are now in effect. All residents should familiarize themselves with the new procedures.",
    type: "emergency",
    priority: "high",
    status: "draft",
    publishDate: null,
    expiryDate: null,
    views: 0,
    isPinned: false,
    author: "Admin"
  }
];

export function NewsAnnouncements() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [publishDate, setPublishDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    type: "",
    priority: "",
    isPinned: false,
    schedulePublish: false
  });

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200"><Wrench className="h-3 w-3 mr-1" />Maintenance</Badge>;
      case 'emergency':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" />Emergency</Badge>;
      case 'system':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200"><Info className="h-3 w-3 mr-1" />System</Badge>;
      case 'general':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200"><Droplets className="h-3 w-3 mr-1" />General</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'expired':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleCreateAnnouncement = () => {
    // Handle creating new announcement
    console.log("Creating announcement:", newAnnouncement);
    setIsCreateDialogOpen(false);
    // Reset form
    setNewAnnouncement({
      title: "",
      content: "",
      type: "",
      priority: "",
      isPinned: false,
      schedulePublish: false
    });
    setPublishDate(undefined);
    setExpiryDate(undefined);
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || announcement.type === selectedType;
    const matchesStatus = selectedStatus === "all" || announcement.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Announcements</h2>
          <p className="text-muted-foreground mt-2">Manage public announcements and news updates for water district customers</p>
        </div>
        <div className="flex items-center space-x-3">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Publish news, updates, or important notices for your water district customers.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter announcement title..."
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter announcement content..."
                    rows={5}
                    value={newAnnouncement.content}
                    onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Announcement Type</Label>
                    <Select value={newAnnouncement.type} onValueChange={(value) => setNewAnnouncement(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General News</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="system">System Update</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Priority Level</Label>
                    <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High Priority</SelectItem>
                        <SelectItem value="medium">Medium Priority</SelectItem>
                        <SelectItem value="low">Low Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label>Pin to Top</Label>
                    <p className="text-sm text-muted-foreground">Display this announcement at the top of the list</p>
                  </div>
                  <Switch
                    checked={newAnnouncement.isPinned}
                    onCheckedChange={(checked) => setNewAnnouncement(prev => ({ ...prev, isPinned: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label>Schedule Publishing</Label>
                    <p className="text-sm text-muted-foreground">Schedule this announcement for future publishing</p>
                  </div>
                  <Switch
                    checked={newAnnouncement.schedulePublish}
                    onCheckedChange={(checked) => setNewAnnouncement(prev => ({ ...prev, schedulePublish: checked }))}
                  />
                </div>

                {newAnnouncement.schedulePublish && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Publish Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {publishDate ? formatDate(publishDate) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={publishDate}
                            onSelect={setPublishDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Expiry Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expiryDate ? formatDate(expiryDate) : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={expiryDate}
                            onSelect={setExpiryDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAnnouncement}>
                  {newAnnouncement.schedulePublish ? "Schedule" : "Publish"} Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Announcements</CardTitle>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Megaphone className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">24</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Published</CardTitle>
            <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
              <Send className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">18</div>
            <p className="text-sm text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Views</CardTitle>
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">15,243</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Drafts</CardTitle>
            <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground mb-2">3</div>
            <p className="text-sm text-muted-foreground">Pending publication</p>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Table */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold">All Announcements</CardTitle>
          <CardDescription className="text-base">Manage your news posts and public announcements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        {announcement.isPinned && (
                          <PinIcon className="h-3 w-3 text-primary mr-2" />
                        )}
                        <div className="font-semibold">{announcement.title}</div>
                      </div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {announcement.content.substring(0, 100)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getTypeBadge(announcement.type)}</TableCell>
                  <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                  <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                  <TableCell>
                    {announcement.publishDate ? (
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {new Date(announcement.publishDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      {announcement.views.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {announcement.status === 'published' && (
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}