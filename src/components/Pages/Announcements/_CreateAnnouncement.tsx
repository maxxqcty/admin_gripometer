import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Textarea } from "../../ui/textarea"
import { Button } from "../../ui/button"
import { Switch } from "../../ui/switch"
import { Calendar } from "../../ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { CalendarIcon } from "lucide-react"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: AnnouncementFormData) => void
}

export type AnnouncementFormData = {
  title: string
  content: string
  type: string
  priority: string
  isPinned: boolean
  schedulePublish: boolean
  publishDate?: Date
  expiryDate?: Date
}

export default function CreateAnnouncementDialog({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [type, setType] = useState("")
  const [priority, setPriority] = useState("")
  const [isPinned, setIsPinned] = useState(false)
  const [schedulePublish, setSchedulePublish] = useState(false)
  const [publishDate, setPublishDate] = useState<Date | undefined>(undefined)
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined)

  const handleSubmit = () => {
    onSubmit({ title, content, type, priority, isPinned, schedulePublish, publishDate, expiryDate })
    // reset
    setTitle("")
    setContent("")
    setType("")
    setPriority("")
    setIsPinned(false)
    setSchedulePublish(false)
    setPublishDate(undefined)
    setExpiryDate(undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Publish news, updates, or important notices for your water district customers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
            />
          </div>

          {/* Content */}
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your announcement..."
              rows={5}
            />
          </div>

          {/* Type & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Announcement Type</Label>
              <Select value={type} onValueChange={setType}>
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
            <div>
              <Label>Priority Level</Label>
              <Select value={priority} onValueChange={setPriority}>
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

          {/* Pin */}
          <div className="flex items-center justify-between">
            <Label htmlFor="pinned">Pin Announcement</Label>
            <Switch id="pinned" checked={isPinned} onCheckedChange={setIsPinned} />
          </div>

          {/* Schedule Publish */}
          <div className="flex items-center justify-between">
            <Label>Schedule Publishing</Label>
            <Switch checked={schedulePublish} onCheckedChange={setSchedulePublish} />
          </div>

          {/* Dates */}
          {schedulePublish && (
            <div className="grid grid-cols-2 gap-4">
              {/* Publish Date */}
              <div>
                <Label>Publish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {publishDate ? publishDate.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} />
                  </PopoverContent>
                </Popover>
              </div>
              {/* Expiry Date */}
              <div>
                <Label>Expiry Date (Optional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expiryDate ? expiryDate.toLocaleDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {schedulePublish ? "Schedule" : "Publish"} Announcement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
